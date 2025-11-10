<?php

namespace DNADesign\Elemental\Forms;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\BaseElement;
use InvalidArgumentException;
use LogicException;
use SilverStripe\Admin\Forms\DependentCompositeField;
use SilverStripe\Control\RequestHandler;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Extensible;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Core\Resettable;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Form;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\FormFactory;
use SilverStripe\Forms\FormField;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\SearchableDropdownField;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\Forms\Validation\RequiredFieldsValidator;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBForeignKey;
use SilverStripe\ORM\Hierarchy\Hierarchy;

class MoveFormFactory implements FormFactory, Resettable
{
    use Extensible;
    use Injectable;

    /**
     * Cached result of {@link MoveFormFactory::getValidParentClasses}
     * @internal
     */
    private static array $cachedValidParentClasses = [];

    /**
     * @inheritDoc
     */
    public static function reset()
    {
        MoveFormFactory::$cachedValidParentClasses = [];
    }

    /**
     * @inheritDoc
     */
    public function getForm(?RequestHandler $controller = null, $name = FormFactory::DEFAULT_NAME, $context = []): Form
    {
        // Validate context
        foreach ($this->getRequiredContext() as $required) {
            if (!isset($context[$required])) {
                throw new InvalidArgumentException("Missing required context $required");
            }
        }

        // Validate record
        $record = $context['Record'];
        if (!is_a($record, BaseElement::class)) {
            $recordClass = is_object($record) ? get_class($record) : gettype($record);
            throw new InvalidArgumentException(
                'Record must be an instance of '
                . BaseElement::class
                . ". Got $recordClass instead."
            );
        }

        // Create form
        $fields = FieldList::create([
            HiddenField::create('ID')->setValue($record->ID),
            $this->getDependentFormField($record),
        ]);
        $actions = FieldList::create([
            FormAction::create('moveElement', _t(__CLASS__ . '.MoveBtn', 'Move'))->addExtraClass('btn-primary'),
        ]);
        $validator = RequiredFieldsValidator::create(['ID', 'ParentClass', 'ParentID', 'ElementalAreaRelation']);
        $form = Form::create($controller, $name, $fields, $actions, $validator);
        $this->invokeWithExtensions('updateForm', $form, $controller, $name, $context);
        return $form;
    }

    /**
     * @inheritDoc
     */
    public function getRequiredContext(): array
    {
        // "Record" is the elemental block which is being moved.
        return ['Record'];
    }

    private function getDependentFormField(BaseElement $record): DependentCompositeField
    {
        $parent = $record->getPage();

        $className = $this->getClassForDropdown($parent?->ClassName ?? '');
        $parentClassField = $this->getParentClassField($record)->setValue($className);

        $parentIdField = $this->getParentIdField(
            ['ParentClass' => $parentClassField],
            HiddenField::create('ParentID', _t(__CLASS__ . '.ParentID', 'Parent')),
            $record
        )->setValue($parent?->ID);

        $ElementalAreaRelationField = $this->getElementalAreaRelationField(
            [
                'ParentClass' => $parentClassField,
                'ParentID' => $parentIdField,
            ],
            HiddenField::create('ElementalAreaRelation', _t(__CLASS__ . '.ElementalAreaRelation', 'Elemental Area'))
        )->setValue($record->ParentID);

        $dependentField = DependentCompositeField::create(
            'MoveFields',
            $record->ClassName . '_' . $record->ID,
            [
                $parentClassField,
                $parentIdField,
                $ElementalAreaRelationField,
            ]
        )->setDependencyCallbacks([
            'ParentID' => [
                'fields' => ['ParentClass'],
                // This callback is triggered to update the ParentID field,
                // and gets the ParentClass field passed into $dependencyFields.
                'callback' => fn ($dependencyFields, $originalField) => $this->getParentIdField(
                    $dependencyFields,
                    $originalField,
                    $record
                ),
            ],
            'ElementalAreaRelation' => [
                'fields' => ['ParentClass', 'ParentID'],
                // This callback is triggered to update the ElementalAreaRelation field,
                // and gets the ParentClass and ParentID fields passed into $dependencyFields.
                'callback' => $this->getElementalAreaRelationField(...),
            ],
        ]);

        return $dependentField;
    }

    private function getParentClassField(BaseElement $record): FormField
    {
        $classes = $this->getClassesForDropdown($record);
        $title = _t(__CLASS__ . '.ParentClass', 'Parent type');
        if (count($classes) > 1) {
            return DropdownField::create(
                'ParentClass',
                $title,
                $classes
            );
        }
        return HiddenField::create('ParentClass', $title);
    }

    private function getParentIdField(array $dependencyFields, FormField $originalField, BaseElement $record): FormField
    {
        $validClasses = $this->getValidParentClasses($record);
        $parentClassField = $dependencyFields['ParentClass'];
        $parentClass = $parentClassField->getValue();

        if (!$parentClass) {
            return HiddenField::create($originalField->getName(), $originalField->Title());
        }

        if (!is_a($parentClass, DataObject::class, true)) {
            throw new LogicException('Parent class must be a DataObject subclass');
        }

        // Exclude current parent if it has only one elemental area.
        // This prevents trying to move it to where it already is.
        $currentParent = $record->getPage();
        $excludeCurrentParent = $currentParent
            ? count($currentParent->getElementalRelations()) <= 1
            : false;

        // For hierarchical data use TreeDropdownField
        if ($parentClass::has_extension(Hierarchy::class)) {
            // Prepare disable function to disable any disallowed parent classes
            $disableFunction = function (DataObject $node) use (
                $parentClass,
                $validClasses,
                $currentParent,
                $excludeCurrentParent
            ) {
                if (!is_a($node, $parentClass)) {
                    return true;
                }
                if ($excludeCurrentParent && $node->ID === $currentParent->ID) {
                    return false;
                }
                if (!array_key_exists($node->ClassName, $validClasses)) {
                    return true;
                }
                return false;
            };

            // Either update existing or create new TreeDropdownField
            if ($originalField instanceof TreeDropdownField) {
                $originalField->setSourceObject($parentClass);
                $originalField->setDisableFunction($disableFunction);
                return $originalField;
            }
            return TreeDropdownField::create(
                $originalField->getName(),
                $originalField->Title(),
                $parentClass
            )->setDisableFunction($disableFunction);
        }

        // For non-hierarchical data use a SearchableDropdownField.
        $list = $parentClass::get();
        if ($excludeCurrentParent) {
            $list = $list->exclude(['ID' => $currentParent->ID]);
        }
        // Apply same lazyloading config as elsewhere in the CMS.
        $threshold = DBForeignKey::config()->get('dropdown_field_threshold');
        $overThreshold = $threshold === 0 || $list->count() > $threshold;
        if ($originalField instanceof SearchableDropdownField) {
            $originalField->setSource($list);
            $originalField->setIsLazyLoaded($overThreshold);
            return $originalField;
        }
        return SearchableDropdownField::create(
            $originalField->getName(),
            $originalField->Title(),
            $list
        )->setIsLazyLoaded($overThreshold);
    }

    private function getElementalAreaRelationField(array $dependencyFields, FormField $originalField): FormField
    {
        $parentClassField = $dependencyFields['ParentClass'];
        $parentClass = $parentClassField->dataValue();
        // No class selected, hide this field.
        if (!$parentClass) {
            return HiddenField::create($originalField->getName(), $originalField->Title());
        }

        $parentIdField = $dependencyFields['ParentID'];
        $parentID = $parentIdField->dataValue();
        $parentRecord = DataObject::get($parentClass)->byID($parentID);
        // No parent selected, hide this field.
        if (!$parentRecord) {
            return HiddenField::create($originalField->getName(), $originalField->Title());
        }
        if (!$parentRecord->hasExtension(ElementalAreasExtension::class)) {
            throw new LogicException(
                "$parentClass doesn't have the ElementalAreasExtension so cannot be a parent for an elemental block"
            );
        }

        /** @var DataObject&ElementalAreasExtension $parentRecord */
        $areaRelations = $parentRecord->getElementalRelations();
        // There must be at least one relation if you have the extension applied!
        if (count($areaRelations) === 0) {
            throw new LogicException("Missing ElementalArea relation on class $parentClass");
        }

        // Nothing to choose between, hide this field with the only option pre-selected.
        if (count($areaRelations) === 1) {
            return HiddenField::create($originalField->getName(), $originalField->Title(), $areaRelations[0]);
        }

        $source = [];
        foreach ($areaRelations as $relationName) {
            $source[$relationName] = $parentRecord->fieldLabel($relationName);
        }
        // Field doesn't need to change, so reuse it
        if (is_a($originalField, DropdownField::class) && $originalField->getSource() === $source) {
            return $originalField;
        }

        return DropdownField::create($originalField->getName(), $originalField->Title(), $source);
    }

    /**
     * Get an associative array of FQCN to human-friendly label for relevant classes that are
     * allowed this block type.
     * Note that some classes will be combined, e.g. hierarchical classes are represented with
     * their hierarchy base class.
     */
    private function getClassesForDropdown(BaseElement $record): array
    {
        $classesForDropdown = [];
        /** @var class-string<DataObject> $class */
        foreach ($this->getValidParentClasses($record) as $class) {
            $class = $this->getClassForDropdown($class);
            if (!$class) {
                continue;
            }
            $singleton = $class::singleton();
            $classesForDropdown[$class] = $singleton->i18n_singular_name();
        }
        return $classesForDropdown;
    }

    /**
     * Get the FQCN that will represent this class in the ParentClass dropdown field.
     *
     * @param class-string<DataObject> $className
     * @return class-string<DataObject>
     */
    private function getClassForDropdown(string $className): string
    {
        if (!class_exists($className)) {
            return '';
        }
        $singleton = $className::singleton();
        if ($className::has_extension(Hierarchy::class)) {
            return $singleton->getHierarchyBaseClass();
        }
        return $className;
    }

    /**
     * Get an array of all classes that are allowed to have an elemental block of this type.
     */
    private function getValidParentClasses(BaseElement $record): array
    {
        // This gets called a couple of times per request and requires a lot of config and ClassInfo calls,
        // so we cache it instead of recalculating it each time.
        if (array_key_exists($record->ClassName, MoveFormFactory::$cachedValidParentClasses)) {
            return MoveFormFactory::$cachedValidParentClasses[$record->ClassName];
        }
        $validClasses = [];
        // The same extension can't be applied to the multiple classes in the same hierarchy
        // without causing a host of problems, so we can be confident that we're not getting any double ups here.
        $classesWithExtension = ClassInfo::classesWithExtension(ElementalAreasExtension::class, DataObject::class);

        // Get a list of classes that can't have elemental blocks despite having the extension to reduce the amount of
        // records we're filtering through needlessly
        $ignoredClasses = array_merge(
            Config::forClass(ElementalAreasExtension::class)->get('ignored_classes') ?? [],
            // It's normal to use the config on the page extension to ignore page classes
            // so we get uninherited config to get those without doubling up on the above.
            Config::forClass(ElementalPageExtension::class)->uninherited('ignored_classes') ?? [],
        );
        foreach ($ignoredClasses as $class) {
            $ignoredClasses = array_merge($ignoredClasses, ClassInfo::subclassesFor($class, false));
        }
        // Make classes the keys for easier lookup
        $ignoredClasses = array_flip($ignoredClasses);

        foreach ($classesWithExtension as $candidateClass) {
            /** @var DataObject&ElementalAreasExtension $singleton */
            $singleton = $candidateClass::singleton();
            // See ElementalAreasExtension::supportsElemental() for how includeElemental() should affect things
            $overrideIgnoredClasses = false;
            if ($singleton->hasMethod('includeElemental')) {
                $includeElementalOverride = $singleton->includeElemental();
                // If includeElemental() returns explicitly false, we ignore this class
                if ($includeElementalOverride === false) {
                    continue;
                }
                // If includeElemental() returns explicitly true, we ignore $ignoredClasses
                if ($includeElementalOverride === true) {
                    $overrideIgnoredClasses = true;
                }
            }

            // Skip ignored classes
            if (!$overrideIgnoredClasses && array_key_exists($candidateClass, $ignoredClasses)) {
                continue;
            }

            // Skip classes that don't support this elemental block type
            if (!array_key_exists($record->ClassName, $singleton->getElementalTypes())) {
                continue;
            }

            $validClasses[$candidateClass] = $candidateClass;
        }

        MoveFormFactory::$cachedValidParentClasses[$record->ClassName] = $validClasses;
        return $validClasses;
    }
}
