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

    protected static $required_extensions = [
        TestPage::class => [
            ElementalPageExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestPage::class,
        TestElement::class
    ];

    protected function setUp(): void
    {
        Versioned::set_stage(Versioned::DRAFT);

        parent::setUp();
    }

    public function testForTemplate()
    {
        $element = $this->objFromFixture(TestElement::class, 'element1');
        // Although we read from Versioned::DRAFT, Versioned will still block draft content view permissions
        $this->logInWithPermission('ADMIN');
        $controller = new TestElementController($element);

        $this->assertStringContainsString('Hello Test', $controller->forTemplate());
    }
}
