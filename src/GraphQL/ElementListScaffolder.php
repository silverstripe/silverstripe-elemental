<?php
namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\ListQueryScaffolder;
use SilverStripe\GraphQL\Scaffolding\StaticSchema;
use SilverStripe\ORM\HasManyList;

class ElementListScaffolder extends ListQueryScaffolder
{
    public function __construct($operationName = null)
    {
        $resolver = function($object, array $args, $context) {
            /** @var ElementalArea $object */
            if (!$object->canView($context['currentUser'])) {
                throw new \Exception('Current user cannot view elements');
            }

            /** @var HasManyList $elements */
            $elements = $object->Elements();
            return $elements;
        };

        $class = BaseElement::class;
        $typeName = StaticSchema::inst()->inheritanceTypeNameForDataObject($class);

        parent::__construct($operationName, $typeName, $resolver, $class);
    }
}
