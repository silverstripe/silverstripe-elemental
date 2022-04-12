<?php

namespace DNADesign\Elemental\Tests\Legacy\GraphQL;

use DNADesign\Elemental\GraphQL\AddElementToAreaMutation;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Tests\GraphQL\FakeResolveInfo;
use DNADesign\Elemental\Tests\Src\TestElement;
use InvalidArgumentException;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\GraphQL\Schema\Schema;
use SilverStripe\Security\Security;

class AddElementToAreaMutationTest extends SapphireTest
{
    protected static $fixture_file = 'AddElementToAreaMutationTest.yml';

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

    public function testAddingBlocksInOrder()
    {
        $className = TestElement::class;
        $areaID = $this->objFromFixture(ElementalArea::class, 'one')->ID;

        $one = $this->runMutation($className, $areaID)->ID;
        $this->assertIdsInOrder([$one], 'The first element is added');

        $two = $this->runMutation($className, $areaID, $one)->ID;
        $this->assertIdsInOrder([$one, $two], 'The second element is added after the first');

        $three = $this->runMutation($className, $areaID, $one)->ID;
        $this->assertIdsInOrder([$one, $three, $two], 'The third element is added after the first');

        $four = $this->runMutation($className, $areaID)->ID;
        $this->assertIdsInOrder(
            [$one, $three, $two, $four],
            'The fourth element is added last, when no after ID parameter is given'
        );

        $five = $this->runMutation($className, $areaID, 0)->ID;
        $this->assertIdsInOrder([$five, $one, $three, $two, $four], 'The fifth element is added first, after ID 0');
    }

    public function testBadElementalArea()
    {
        $this->expectException(InvalidArgumentException::class);
        $areaID = $this->objFromFixture(ElementalArea::class, 'one')->ID;
        $this->runMutation(TestElement::class, $areaID + 1);
    }

    public function testOrderingByWrongElementalArea()
    {
        $this->expectException(InvalidArgumentException::class);
        $firstArea = ElementalArea::get()->first();
        $elementInFirstArea = TestElement::create();
        $firstArea->Elements()->add($elementInFirstArea);

        ElementalArea::create()->write();
        $this->runMutation(TestElement::class, 2, $elementInFirstArea->ID);
    }

    protected function assertIdsInOrder($ids, $message = null)
    {
        $actualIDs = TestElement::get()->sort('Sort')->map()->keys();
        // Ideally this should be assertSame, but sometimes the database
        // returns IDs as strings instead of integers (e.g. "1" instead of 1).
        $this->assertEquals($ids, $actualIDs, $message);
    }

    protected function runMutation($className, $elementalAreaID, $afterElementId = null)
    {
        $mutation = new AddElementToAreaMutation();
        $context = ['currentUser' => Security::getCurrentUser()];
        $resolveInfo = new FakeResolveInfo();

        $args = [
            'className' => $className,
            'elementalAreaID' => $elementalAreaID,
        ];

        if (!is_null($afterElementId)) {
            $args['afterElementID'] = $afterElementId;
        }

        return $mutation->resolve(null, $args, $context, $resolveInfo);
    }
}
