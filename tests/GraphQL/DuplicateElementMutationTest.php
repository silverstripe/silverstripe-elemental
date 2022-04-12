<?php

namespace DNADesign\Elemental\Tests\GraphQL;

use DNADesign\Elemental\GraphQL\DuplicateElementMutation;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Tests\GraphQL\FakeResolveInfo;
use InvalidArgumentException;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Security\Security;

class DuplicateElementMutationTest extends SapphireTest
{
    protected function setUp(): void
    {
        parent::setUp();
        if (!class_exists(Schema::class)) {
            $this->markTestSkipped('Skipped GraphQL 4 test ' . __CLASS__);
        }
    }

    public function testResolvePermissions()
    {
        $cannotEditClass = new class extends BaseElement {
            public function canEdit($member = null)
            {
                return false;
            }
            public function canCreate($member = null, $context = [])
            {
                return true;
            }
        };

        $cannotCreateClass = new class extends BaseElement {
            public function canEdit($member = null)
            {
                return true;
            }
            public function canCreate($member = null, $context = [])
            {
                return false;
            }
        };

        $area = new ElementalArea();
        $area->write();

        $testCases = [
            [$cannotEditClass, 'edit'],
            [$cannotCreateClass, 'create'],
        ];

        foreach ($testCases as $data) {
            [$class, $operation] = $data;

            $element = new $class();
            $element->ParentID = $area->ID;
            $element->write();
            $mutation = new DuplicateElementMutation();
            $object = null;
            $args = ['id' => $element->ID];
            $context = ['currentUser' => Security::getCurrentUser()];
            $resolveInfo = new FakeResolveInfo();

            $this->expectException(InvalidArgumentException::class);
            $this->expectExceptionMessageRegExp("#insufficient permission to {$operation}#");
            $mutation->resolve($object, $args, $context, $resolveInfo);
        }
    }
}
