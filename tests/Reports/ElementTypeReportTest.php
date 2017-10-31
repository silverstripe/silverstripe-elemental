<?php

namespace DNADesign\Elemental\Tests\Reports;

use DNADesign\Elemental\Reports\ElementTypeReport;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use DNADesign\Elemental\Tests\Src\TestUnusedElement;
use SilverStripe\Dev\FunctionalTest;
use SilverStripe\ORM\ArrayList;
use SilverStripe\View\ArrayData;

class ElementTypeReportTest extends FunctionalTest
{
    protected $usesDatabase = true;

    protected static $extra_dataobjects = [
        TestElement::class,
        TestPage::class,
        TestUnusedElement::class,
    ];

    public function testReportShowsBlockTypes()
    {
        $this->logInWithPermission('ADMIN');

        $result = (string) $this->get('admin/reports/show/DNADesign-Elemental-Reports-ElementTypeReport')->getBody();

        $this->assertContains('Content Type', $result, 'Table has headings');

        $this->assertContains('Unused Element', $result, 'Unused elements are still shown in the report');

        $this->assertContains(
            'data-class="DNADesign-Elemental-Models-ElementContent"',
            $result,
            'Report contains content element (bundled with elemental)'
        );
    }

    public function testSourceRecords()
    {
        $records = (new ElementTypeReport)->sourceRecords();

        $this->assertInstanceOf(ArrayList::class, $records);
        $this->assertNotContains(BaseElement::class, $records->toArray(), 'BaseElement is excluded');

        $this->assertContainsOnlyInstancesOf(ArrayData::class, $records);

        foreach ($records as $record) {
            $this->assertNotNull($record->Icon);
            $this->assertNotNull($record->Type);
            $this->assertInternalType('int', $record->Total);
        }
    }
}
