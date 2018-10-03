<?php

namespace DNADesign\Elemental\Tests\Services;

use DNADesign\Elemental\Services\ReorderElements;
use DNADesign\Elemental\Tests\Src\TestElement;
use SilverStripe\Dev\SapphireTest;

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
        $element = $this->objFromFixture(TestElement::class, 'element1');
        $reorderService = new ReorderElements($element);

        $reorderService->reorder(4);
        $this->assertIdsInOrder([2, 3, 4, 1], 'The Element should be last in the list');

        $reorderService->reorder(0);
        $this->assertIdsInOrder([1, 2, 3, 4], 'The Element should be first in the list');

        $reorderService->reorder(2);
        $this->assertIdsInOrder([2, 1, 3, 4], 'The Element should be second in the list');

        $reorderService->reorder();
        $this->assertIdsInOrder([1, 2, 3, 4], 'The Element should be first in the list');
    }

    protected function assertIdsInOrder($ids, $message = null)
    {
        $actualIDs = TestElement::get()->sort('Sort')->column('ID');

        // Ideally this should be assertSame, but sometimes the database
        // returns IDs as strings instead of integers (e.g. "1" instead of 1).
        $this->assertEquals($ids, $actualIDs, $message);
    }
}
