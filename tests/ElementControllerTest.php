<?php

namespace DNADesign\Elemental\Tests;

use SilverStripe\Dev\FunctionalTest;
use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Dev\TestOnly;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\Form;
use DNADesign\Elemental\Controllers\ElementController;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Tests\TestPage;
use DNADesign\Elemental\Tests\TestElement;
use SilverStripe\Versioned\Versioned;

/**
 * @package elements
 * @subpackage tests
 */
class ElementControllerTest extends FunctionalTest {

    protected static $fixture_file = 'ElementControllerTest.yml';

    protected static $extra_dataobjects = array(
        TestPage::class,
        TestElement::class
    );

    public function setUp()
    {
        Versioned::set_stage(Versioned::DRAFT);
        parent::setUp();
    }

    public function testElementFormRendering() {
        $this->logInWithPermission('ADMIN');
        $page = $this->objFromFixture(TestPage::class, 'page1');
        $page->doPublish();

        $element = $this->objFromFixture(TestElement::class, 'element1');

        $response = $this->get($page->URLSegment);
        $formAction = sprintf('%s/element/%d/Form', $page->URLSegment, $element->ID);
        $this->assertContains(
            $formAction,
            $response->getBody(),
            'Element forms are rendered through ElementalArea templates'
        );
    }

    public function testElementFormSubmission() {
        $this->logInWithPermission('ADMIN');
        $page = $this->objFromFixture(TestPage::class, 'page1');
        $page->doPublish();

        $element = $this->objFromFixture(TestElement::class, 'element1');

        $response = $this->get($page->URLSegment);
        $response = $this->submitForm('Form_Form', null, array('TestValue' => 'Updated'));

        $this->assertContains(
            'TestValue: Updated',
            $response->getBody(),
            'Form values are submitted to correct element form'
        );
        $this->assertContains(
            sprintf('Element ID: %d', $element->ID),
            $response->getBody(),
            'Element form acts on correct element, as identified in the URL'
        );
    }
}
