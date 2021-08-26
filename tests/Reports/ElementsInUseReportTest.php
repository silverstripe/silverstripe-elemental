<?php

namespace DNADesign\Elemental\Tests\Reports;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Reports\ElementsInUseReport;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\Dev\FunctionalTest;
use SilverStripe\GraphQL\Tests\Schema\NaiveSchemaBuilder;
use SilverStripe\ORM\DataList;

class ElementsInUseReportTest extends FunctionalTest
{
    protected static $fixture_file = 'ElementsInUseReportTest.yml';

    protected static $required_extensions = [
        TestPage::class => [
            ElementalPageExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestElement::class,
        TestPage::class,
    ];

    protected function setUp()
    {
        parent::setUp();

        // GraphQL 4 only
        if (class_exists(NaiveSchemaBuilder::class)) {
            NaiveSchemaBuilder::activate();
        }
    }

    protected function tearDown()
    {
        parent::tearDown();
        
        // GraphQL 4 only
        if (class_exists(NaiveSchemaBuilder::class)) {
            NaiveSchemaBuilder::deactivate();
        }
    }

    public function testReportShowsElementsInUse()
    {
        $this->logInWithPermission('ADMIN');

        $result = (string) $this->get('admin/reports/show/DNADesign-Elemental-Reports-ElementsInUseReport')->getBody();

        $this->assertContains('Content blocks in use', $result, 'Title is displayed');

        $this->assertContains(
            'data-class="DNADesign\\Elemental\\Models\\ElementContent"',
            $result,
            'Report contains content elements (bundled with elemental)'
        );

        $this->assertContains('HTML text block', $result, 'Content element "nice" type is shown');

        $this->assertContains('My special content block', $result, 'Fixtured content element is shown');
        $this->assertContains('Stubby Stub', $result, 'Fixtured stub element is shown');
    }

    public function testSourceRecords()
    {
        $records = (new ElementsInUseReport)->sourceRecords();

        $this->assertInstanceOf(DataList::class, $records);
        $this->assertNotEmpty($records);
        $this->assertContainsOnlyInstancesOf(BaseElement::class, $records, 'Report contains elements');

        foreach ($records as $record) {
            $this->assertNotEquals(BaseElement::class, get_class($record), 'BaseElement does not exist in the report');
        }
    }

    public function testElementsAssociatedToPagesHaveEditLink()
    {
        $records = (new ElementsInUseReport)->sourceRecords()->filter(['Title' => 'Welcome to Castros']);

        $castros = $records->first();
        $this->assertNotNull($castros, 'Fixtured Castros page exists');
        $this->assertTrue($castros->hasField('EditLink'));
        $this->assertContains(
            (string) $this->idFromFixture(TestPage::class, 'castros_home'),
            $castros->EditLink,
            'Correct owner page ID is in edit link'
        );
    }

    public function testSourceRecordsFilteredByClassName()
    {
        $records = (new ElementsInUseReport)->sourceRecords([
            'ClassName' => 'DNADesign-Elemental-Models-ElementContent',
        ]);

        $this->assertInstanceOf(DataList::class, $records);
        $this->assertNotEmpty($records->toArray(), 'Results are returned when filtered');
        $this->assertContainsOnlyInstancesOf(
            ElementContent::class,
            $records->toArray(),
            'Only contains filtered element type'
        );
    }
}
