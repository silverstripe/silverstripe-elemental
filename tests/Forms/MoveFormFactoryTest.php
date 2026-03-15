<?php

namespace DNADesign\Elemental\Tests\Forms;

use BasicElementalPage;
use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Forms\MoveFormFactory;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementContent;
use PHPUnit\Framework\Attributes\DataProvider;
use ReflectionMethod;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Manifest\ModuleLoader;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ORM\DataObject;
use DNADesign\Elemental\Tests\Src\TestDataObject;
use DNADesign\Elemental\Tests\Src\TestDataObjectIncludeElemental;
use DNADesign\Elemental\Tests\Src\TestDataObjectExcludeElemental;
use DNADesign\Elemental\Tests\Src\TestPreviewableDataObject;
use DNADesign\Elemental\Tests\Src\TestPreviewableDataObjectWithLink;
use DNADesign\Elemental\Tests\Src\TestPage;
use DNADesign\Elemental\Tests\Src\TestPage2;
use DNADesign\Elemental\Tests\Blocks\TestElementContent;
use InvalidArgumentException;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\SearchableDropdownField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\Model\ModelData;
use SilverStripe\Security\Group;

class MoveFormFactoryTest extends SapphireTest
{
    protected static $fixture_file = 'MoveFormFactoryTest.yml';

    protected static $required_extensions = [
        TestPage::class => [
            ElementalPageExtension::class,
        ],
        TestPage2::class => [
            ElementalPageExtension::class,
        ],
        TestDataObject::class => [
            ElementalAreasExtension::class,
        ],
        TestDataObjectIncludeElemental::class => [
            ElementalAreasExtension::class,
        ],
        TestDataObjectExcludeElemental::class => [
            ElementalAreasExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestPage::class,
        TestPage2::class,
        TestDataObject::class,
        TestDataObjectIncludeElemental::class,
        TestDataObjectExcludeElemental::class,
        TestPreviewableDataObject::class,
        TestPreviewableDataObjectWithLink::class,
        TestElementContent::class,
    ];

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();
        // Don't let frameworktest fixtures affect these tests
        if (ModuleLoader::inst()->getManifest()->moduleExists('silverstripe/frameworktest')) {
            $disallowedClasses = [BasicElementalPage::class];
            foreach (ClassInfo::subclassesFor(DataObject::class, false) as $class) {
                if (str_starts_with($class, 'SilverStripe\\FrameworkTest')) {
                    $disallowedClasses[] = $class;
                }
            }
            Config::forClass(ElementalAreasExtension::class)->set('ignored_classes', $disallowedClasses);
        }
    }

    public static function provideGetForm(): array
    {
        return [
            [
                'context' => ['DifferentThing' => 'not a record'],
                'expectedExceptionMessage' => 'Missing required context Record',
            ],
            [
                'context' => ['Record' => 'ahahahahaha'],
                'expectedExceptionMessage' => 'Record must be an instance of '
                    . BaseElement::class . '. Got string instead.',
            ],
            [
                // using this creationType allows us to instantiate a DataObject in a dataprovider
                'context' => ['Record' => new DataObject(creationType: DataObject::CREATE_SINGLETON)],
                'expectedExceptionMessage' => 'Record must be an instance of '
                    . BaseElement::class . '. Got ' . DataObject::class . ' instead.',
            ],
            [
                'context' => ['Record' => new BaseElement(creationType: DataObject::CREATE_SINGLETON)],
                'expectedExceptionMessage' => '',
            ],
        ];
    }

    /**
     * Very light touch test to check the $context array is managed correctly.
     * Most form checks are done in more specific unit tests below or in behat.
     */
    #[DataProvider('provideGetForm')]
    public function testGetForm(array $context, string $expectedExceptionMessage): void
    {
        $factory = new MoveFormFactory();
        if ($expectedExceptionMessage) {
            $this->expectException(InvalidArgumentException::class);
            $this->expectExceptionMessage($expectedExceptionMessage);
        } else {
            // No assertions - the test passes if there's no exception thrown.
            $this->expectNotToPerformAssertions();
        }
        $factory->getForm(context: $context);
    }

    /**
     * Test that the ParentClass field uses the correct field type based on the number of allowed classes
     */
    public function testGetParentClassField(): void
    {
        $factory = new MoveFormFactory();
        $reflectionMethod = new ReflectionMethod($factory, 'getParentClassField');
        $formField = $reflectionMethod->invoke($factory, new TestElementContent());
        $this->assertInstanceOf(DropdownField::class, $formField);

        // Disallow all but a single owner class
        Config::forClass(ElementalAreasExtension::class)->merge('ignored_classes', [
            TestPage::class,
            TestPage2::class,
            TestDataObject::class,
            TestDataObjectExcludeElemental::class,
        ]);
        MoveFormFactory::reset();
        $formField = $reflectionMethod->invoke($factory, new TestElementContent());
        $this->assertInstanceOf(HiddenField::class, $formField);
    }

    public static function provideGetParentIdField(): array
    {
        return [
            'Become treedropdown, was hidden field' => [
                // can't instantiate FormField in a dataprovider
                // so we provide the information needed to instantiate one instead
                'dependencyFieldSpecs' => [
                    'ParentClass' => [
                        'class' => HiddenField::class,
                        'value' => SiteTree::class,
                    ],
                ],
                'originalFieldSpecs' => [
                    'class' => HiddenField::class,
                    'args' => ['ParentID'],
                ],
                'recordClass' => TestElementContent::class,
                'expectedClass' => TreeDropdownField::class,
            ],
            'Become searchabledropdown, was hidden field' => [
                'dependencyFieldSpecs' => [
                    'ParentClass' => [
                        'class' => HiddenField::class,
                        'value' => TestDataObject::class,
                    ],
                ],
                'originalFieldSpecs' => [
                    'class' => HiddenField::class,
                    'args' => ['ParentID'],
                ],
                'recordClass' => TestElementContent::class,
                'expectedClass' => SearchableDropdownField::class,
            ],
            'Update existing treedropdown' => [
                'dependencyFieldSpecs' => [
                    'ParentClass' => [
                        'class' => HiddenField::class,
                        'value' => SiteTree::class,
                    ],
                ],
                'originalFieldSpecs' => [
                    'class' => TreeDropdownField::class,
                    'args' => [
                        'ParentID',
                        'sourceObject' => Group::class,
                    ],
                ],
                'recordClass' => TestElementContent::class,
                'expectedClass' => TreeDropdownField::class,
            ],
            'Update existing searchabledropdown' => [
                'dependencyFieldSpecs' => [
                    'ParentClass' => [
                        'class' => HiddenField::class,
                        'value' => TestDataObject::class,
                    ],
                ],
                'originalFieldSpecs' => [
                    'class' => SearchableDropdownField::class,
                    'args' => ['ParentID'],
                ],
                'recordClass' => TestElementContent::class,
                'expectedClass' => SearchableDropdownField::class,
            ],
        ];
    }

    #[DataProvider('provideGetParentIdField')]
    public function testGetParentIdField(
        array $dependencyFieldSpecs,
        array $originalFieldSpecs,
        string $recordClass,
        string $expectedClass
    ): void {
        $dependencyFields = [];
        foreach ($dependencyFieldSpecs as $fieldName => $info) {
            $dependencyFields[$fieldName] = (new $info['class']($fieldName))->setValue($info['value']);
        }
        $originalField = new $originalFieldSpecs['class'](...$originalFieldSpecs['args']);
        $factory = new MoveFormFactory();
        $reflectionMethod = new ReflectionMethod($factory, 'getParentIdField');

        $formField = $reflectionMethod->invoke($factory, $dependencyFields, $originalField, new $recordClass());
        $this->assertInstanceOf($expectedClass, $formField);

        // Check the original field is updated when it's the same class as the replacement
        if ($originalFieldSpecs['class'] === $expectedClass) {
            $this->assertSame($originalField, $formField);
        }

        // Check the new field uses the appropriate source
        if ($expectedClass === TreeDropdownField::class) {
            $this->assertSame($dependencyFieldSpecs['ParentClass']['value'], $formField->getSourceObject());
        }
        if ($expectedClass === SearchableDropdownField::class) {
            $this->assertSame($dependencyFieldSpecs['ParentClass']['value'], $formField->getSourceList()->dataClass());
        }
    }

    public static function provideGetParentIdFieldExceptions(): array
    {
        return [
            [
                'parentClass' => 'NotAClass',
            ],
            [
                'parentClass' => ModelData::class,
            ],
        ];
    }

    #[DataProvider('provideGetParentIdFieldExceptions')]
    public function getGetParentIdFieldExceptions(string $parentClass): void
    {
        $dependencyFields = [
            'ParentClass' => (new TextField('ParentClass'))->setValue($parentClass),
        ];
        $factory = new MoveFormFactory();
        $reflectionMethod = new ReflectionMethod($factory, 'getParentIdField');

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Parent class must be a DataObject subclass');
        $reflectionMethod->invoke($factory, $dependencyFields, HiddenField::create(''), new BaseElement());
    }

    public static function provideGetElementalAreaRelationField(): array
    {
        return [
            'Hide field if no parent class' => [
                'fixture' => [
                    'class' => '',
                    'name' => 'basic_page',
                ],
                'originalFieldClass' => TextField::class,
                'expectedClass' => HiddenField::class,
                'expectedValue' => null,
            ],
            'Hide field if no parent ID' => [
                'fixture' => [
                    'class' => TestPage::class,
                    'name' => '',
                ],
                'originalFieldClass' => TextField::class,
                'expectedClass' => HiddenField::class,
                'expectedValue' => null,
            ],
            'Hide field if only one elelemental area relation' => [
                'fixture' => [
                    'class' => TestPage::class,
                    'name' => 'basic_page',
                ],
                'originalFieldClass' => TextField::class,
                'expectedClass' => HiddenField::class,
                'expectedValue' => 'ElementalArea',
            ],
            'Dropdown for multiple elemental area relations' => [
                'fixture' => [
                    'class' => TestPage2::class,
                    'name' => 'basic_page',
                ],
                'originalFieldClass' => TextField::class,
                'expectedClass' => DropdownField::class,
                'expectedValue' => null,
            ],
        ];
    }

    #[DataProvider('provideGetElementalAreaRelationField')]
    public function testGetElementalAreaRelationField(
        array $fixture,
        string $originalFieldClass,
        string $expectedClass,
        ?string $expectedValue
    ): void {
        $fixtureClass = null;
        $parentClass = null;
        if (!empty($fixture['class'])) {
            $fixtureClass = $fixture['class'];
            $parentClass = $fixture['class'];
            if (is_a($parentClass, SiteTree::class, true)) {
                $parentClass = SiteTree::class;
            }
        }
        $parentID = null;
        if (!empty($fixture['name'])) {
            if ($fixtureClass) {
                $parentID = $this->idFromFixture($fixtureClass, $fixture['name']);
            } else {
                // Any arbitrary value will do - the point is just that it's not empty.
                $parentID = 7;
            }
        }
        $dependencyFields = [
            'ParentClass' => new HiddenField('ParentClass', value: $parentClass),
            'ParentID' => new HiddenField('ParentID', value: $parentID),
        ];

        $originalField = new $originalFieldClass('ElementalAreaRelation');
        $factory = new MoveFormFactory();
        $reflectionMethod = new ReflectionMethod($factory, 'getElementalAreaRelationField');

        $formField = $reflectionMethod->invoke($factory, $dependencyFields, $originalField);
        $this->assertInstanceOf($expectedClass, $formField);
        $this->assertSame($expectedValue, $formField->dataValue());

        if ($expectedClass === DropdownField::class) {
            $expectedSource = [
                'ElementalArea' => 'Elemental area',
                'ElementalArea2' => 'My second elemental area'
            ];
            $this->assertEquals($expectedSource, $formField->getSource());
        }
    }

    public static function provideGetClassesForDropdown(): array
    {
        return [
            'BaseElement is effectively abstract' => [
                'recordClass' => BaseElement::class,
                'expectedClasses' => [],
            ],
            'Golden path - Hierarchy classes are combined' => [
                'recordClass' => TestElementContent::class,
                'expectedClasses' => [
                    SiteTree::class => 'Page',
                    TestDataObject::class => 'Test Data Object',
                    TestDataObjectIncludeElemental::class => 'Test Data Object Include Elemental',
                    TestPreviewableDataObject::class => 'Test Previewable Data Object',
                    TestPreviewableDataObjectWithLink::class => 'Test Previewable Data Object With Link',
                ],
            ],
        ];
    }

    #[DataProvider('provideGetClassesForDropdown')]
    public function testGetClassesForDropdown(string $recordClass, array $expectedClasses): void
    {
        $record = new $recordClass();
        $factory = new MoveFormFactory();
        $reflectionMethod = new ReflectionMethod($factory, 'getClassesForDropdown');
        $result = $reflectionMethod->invoke($factory, $record);
        $this->assertEquals($expectedClasses, $result);
    }

    public static function provideGetValidParentClasses(): array
    {
        return [
            'BaseElement is effectively abstract' => [
                'recordClass' => BaseElement::class,
                'configToSet' => [],
                'expectedClasses' => [],
            ],
            'golden path - no config' => [
                'recordClass' => TestElementContent::class,
                'configToSet' => [],
                'expectedClasses' => [
                    TestPage::class => TestPage::class,
                    TestPage2::class => TestPage2::class,
                    TestDataObject::class => TestDataObject::class,
                    TestDataObjectIncludeElemental::class => TestDataObjectIncludeElemental::class,
                    TestPreviewableDataObject::class => TestPreviewableDataObject::class,
                    TestPreviewableDataObjectWithLink::class => TestPreviewableDataObjectWithLink::class,
                ],
            ],
            'ignore some classes incl implicitly ignoring subclasses' => [
                'recordClass' => TestElementContent::class,
                'configToSet' => [
                    ElementalAreasExtension::class => [
                        'ignored_classes' => [
                            TestPage::class,
                            TestPreviewableDataObject::class,
                            // Gets included despite being in "ignored_classes" due to includeElemental() method
                            TestDataObjectIncludeElemental::class,
                        ],
                    ],
                ],
                'expectedClasses' => [
                    TestPage2::class => TestPage2::class,
                    TestDataObjectIncludeElemental::class => TestDataObjectIncludeElemental::class,
                    TestDataObject::class => TestDataObject::class,
                ],
            ],
            'explicit allowed and disallowed elements' => [
                'recordClass' => TestElementContent::class,
                'configToSet' => [
                    // No allowed elements
                    TestPage::class => [
                        'allowed_elements' => [],
                    ],
                    // Explicitly allows this class directly
                    TestPage2::class => [
                        'allowed_elements' => [TestElementContent::class],
                    ],
                    // Allows the parent class (which implicitly disallows the direct class)
                    TestDataObjectIncludeElemental::class => [
                        'allowed_elements' => [ElementContent::class],
                    ],
                    // Allows this class directly but disallows the parent class
                    TestDataObject::class => [
                        'allowed_elements' => [TestElementContent::class],
                        'disallowed_elements' => [ElementContent::class],
                    ],
                    // Disallows the parent class (which does NOT implicitly disallow the direct class)
                    TestPreviewableDataObject::class => [
                        'disallowed_elements' => [ElementContent::class],
                    ],
                    // Allows the class through inheritance - but explicitly disallows this class directly
                    TestPreviewableDataObjectWithLink::class => [
                        'disallowed_elements' => [TestElementContent::class],
                    ],
                ],
                'expectedClasses' => [
                    TestPage2::class => TestPage2::class,
                    TestDataObject::class => TestDataObject::class,
                    TestPreviewableDataObject::class => TestPreviewableDataObject::class,
                ],
            ],
        ];
    }

    #[DataProvider('provideGetValidParentClasses')]
    public function testGetValidParentClasses(string $recordClass, array $configToSet, array $expectedClasses): void
    {
        $record = new $recordClass();
        $factory = new MoveFormFactory();
        $reflectionMethod = new ReflectionMethod($factory, 'getValidParentClasses');

        foreach ($configToSet as $class => $config) {
            $configForClass = Config::forClass($class);
            foreach ($config as $name => $value) {
                // Merge ignored_classes so we keep the frameworktest ignored classes from setUpBeforeClass
                if ($name === 'ignored_classes') {
                    $configForClass->merge($name, $value);
                } else {
                    $configForClass->set($name, $value);
                }
            }
        }

        $result = $reflectionMethod->invoke($factory, $record);
        $this->assertEquals($expectedClasses, $result);
    }
}
