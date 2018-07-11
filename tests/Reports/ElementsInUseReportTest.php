<?php

namespace DNADesign\Elemental\Tests\Reports;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Reports\ElementsInUseReport;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\Dev\FunctionalTest;
use SilverStripe\ORM\ArrayList;
use SilverStripe\View\ArrayData;

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

    public function testReportShowsElementsInUse()
    {
        $this->logInWithPermission('ADMIN');

        $result = (string) $this->get('admin/reports/show/DNADesign-Elemental-Reports-ElementsInUseReport')->getBody();

        $this->assertContains('Content blocks in use', $result, 'Title is displayed');

        $this->assertContains(
            'data-class="DNADesign-Elemental-Models-ElementContent"',
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

        $this->assertInstanceOf(ArrayList::class, $records);
        $this->assertNotContains(BaseElement::class, $records->toArray(), 'BaseElement is excluded');

        $this->assertContainsOnlyInstancesOf(ArrayData::class, $records);

        foreach ($records as $record) {
            $this->assertNotNull($record->Icon, 'Fields have an icon');
            $this->assertNotNull($record->Type, 'Fields have a type');
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

        $this->assertInstanceOf(ArrayList::class, $records);
        $this->assertNotEmpty($records->toArray(), 'Results are returned when filtered');
        $this->assertEquals(
            [
                'DNADesign-Elemental-Models-ElementContent'
            ],
            array_unique($records->column('ClassName')),
            'Only contains filtered element type'
        );
    }
}
