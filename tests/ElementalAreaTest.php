<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Forms\ElementalGridFieldAddNewMultiClass;
use DNADesign\Elemental\Tests\Src\TestElement;
use Page;
use SilverStripe\CMS\Model\RedirectorPage;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\GridField\GridField;

class ElementalAreaTest extends SapphireTest
{
    protected static $fixture_file = 'ElementalAreaTest.yml';

    protected static $required_extensions = [
        Page::class => [
            ElementalPageExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestElement::class
    ];

    public function testElementControllers()
    {
        $area = $this->objFromFixture(ElementalArea::class, 'area1');
        $controllers = $area->ElementControllers();

        $this->assertEquals(2, $controllers->count(), 'Should be a controller per element');
    }

    public function testGetOwnerPage()
    {
        $this->markTestIncomplete();
    }

    public function testForTemplate()
    {
        $area = $this->objFromFixture(ElementalArea::class, 'area1');

        $this->assertContains('Hello Test', $area->forTemplate());
        $this->assertContains('Hello Test 2', $area->forTemplate());
    }
}
