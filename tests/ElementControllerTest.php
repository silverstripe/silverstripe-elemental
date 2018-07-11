<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestElementController;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\Dev\FunctionalTest;
use SilverStripe\Versioned\Versioned;

class ElementControllerTest extends FunctionalTest
{
    protected static $fixture_file = 'ElementControllerTest.yml';

    protected static $use_draft_site = true;

    protected static $required_extensions = [
        TestPage::class => [
            ElementalPageExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestPage::class,
        TestElement::class
    ];

    protected function setUp()
    {
        Versioned::set_stage(Versioned::DRAFT);

        parent::setUp();
    }

    public function testForTemplate()
    {
        $element = $this->objFromFixture(TestElement::class, 'element1');
        $controller = new TestElementController($element);

        $this->assertContains('Hello Test', $controller->forTemplate());
    }
}
