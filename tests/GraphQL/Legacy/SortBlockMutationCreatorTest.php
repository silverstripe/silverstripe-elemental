<?php

namespace DNADesign\Elemental\Tests\Legacy\GraphQL;

use DNADesign\Elemental\GraphQL\SortBlockMutationCreator;
use DNADesign\Elemental\Tests\Src\TestElement;
use SilverStripe\GraphQL\Tests\Fake\FakeResolveInfo;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\GraphQL\Schema\Schema;
use SilverStripe\Security\Security;

class SortBlockMutationCreatorTest extends SapphireTest
{
    protected static $fixture_file = 'SortBlockMutationCreatorTest.yml';

    protected static $extra_dataobjects = [
        TestElement::class,
    ];

    protected function setUp(): void
    {
        parent::setUp();
        if (class_exists(Schema::class)) {
            $this->markTestSkipped('Skipped GraphQL 3 test ' . __CLASS__);
        }
    }

    /**
     * Reorders blocks by compounding each result into the next test (rather than isolated sorting tests)
     */
    public function testSortBlock()
    {
        $this->runMutation(1, 3);
        $this->assertIdsInOrder([2, 3, 1, 4]);

        $this->runMutation(4, 2);
        $this->assertIdsInOrder([2, 4, 3, 1]);

        $this->runMutation(1, 0);
        $this->assertIdsInOrder([1, 2, 4, 3]);

        $this->runMutation(3, 2);
        $this->assertIdsInOrder([1, 2, 3, 4]);
    }

    protected function assertIdsInOrder($ids)
    {
        $actualIDs = TestElement::get()->sort('Sort')->map()->keys();

        $this->assertSame($ids, $actualIDs);
    }

    protected function runMutation($id, $afterBlockId)
    {
        $member = Security::getCurrentUser();

        $mutation = new SortBlockMutationCreator();
        $context = ['currentUser' => $member];
        $resolveInfo = new FakeResolveInfo([]);

        $mutation->resolve(null, [
            'id' => $id,
            'afterBlockID' => $afterBlockId,
        ], $context, $resolveInfo);
    }
}
