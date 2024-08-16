<?php

namespace DNADesign\Elemental\Tests\Services;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Services\ReorderElements;
use DNADesign\Elemental\Tests\Src\TestElement;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Versioned\Versioned;

class ReorderElementsTest extends SapphireTest
{
    protected static $fixture_file = 'ReorderElementsTest.yml';

    protected static $extra_dataobjects = [
        TestElement::class,
    ];

    /**
     * Reorders blocks by compounding each result into the next test (rather than isolated sorting tests)
     */
    public function testReorder()
    {
        foreach (BaseElement::get() as $toPublish) {
            $toPublish->publishSingle();
        }
        $element = $this->objFromFixture(TestElement::class, 'element1');
        $reorderService = new ReorderElements($element);

        $reorderService->reorder(4);
        $this->assertIdsInOrder([2, 3, 4, 1], [1, 2, 3, 4], 'The Element should be last in the list (draft only)');
        $element->publishSingle();
        $this->assertIdsInOrder([2, 3, 4, 1], [2, 3, 4, 1], 'The sort order should be published correctly');

        $reorderService->reorder(0);
        $this->assertIdsInOrder([1, 2, 3, 4], [2, 3, 4, 1], 'The Element should be first in the list (draft only)');
        $element->publishSingle();
        $this->assertIdsInOrder([1, 2, 3, 4], [1, 2, 3, 4], 'The sort order should be published correctly');

        $reorderService->reorder(2);
        $this->assertIdsInOrder([2, 1, 3, 4], [1, 2, 3, 4], 'The Element should be second in the list (draft only)');
        $element->publishSingle();
        $this->assertIdsInOrder([2, 1, 3, 4], [2, 1, 3, 4], 'The sort order should be published correctly');

        $reorderService->reorder();
        $this->assertIdsInOrder([1, 2, 3, 4], [2, 1, 3, 4], 'The Element should be first in the list (draft only)');
        $element->publishSingle();
        $this->assertIdsInOrder([1, 2, 3, 4], [1, 2, 3, 4], 'The sort order should be published correctly');
    }

    protected function assertIdsInOrder($draftIds, $publishedIDs, $message = null)
    {
        // Check draft
        Versioned::withVersionedMode(function () use ($draftIds, $message) {
            Versioned::set_stage(Versioned::DRAFT);
            $actualIDs = TestElement::get()->sort('Sort')->column('ID');

            // Ideally this should be assertSame, but sometimes the database
            // returns IDs as strings instead of integers (e.g. "1" instead of 1).
            $this->assertEquals($draftIds, $actualIDs, $message);
        });
        // Check published
        Versioned::withVersionedMode(function () use ($publishedIDs, $message) {
            Versioned::set_stage(Versioned::LIVE);
            $actualIDs = TestElement::get()->sort('Sort')->column('ID');
            $this->assertEquals($publishedIDs, $actualIDs, $message);
        });
    }
}
