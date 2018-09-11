<?php
namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use SilverStripe\GraphQL\MutationCreator;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DB;
use SilverStripe\ORM\Queries\SQLUpdate;

class SortBlockMutationCreator extends MutationCreator implements OperationResolver
{
    public function attributes()
    {
        return [
            'name' => 'sortBlock',
            'description' => 'Changes the sort position of an element'
        ];
    }

    public function type()
    {
        return $this->manager->getType('Block');
    }

    public function args()
    {
        return [
            'ID' => ['type' => Type::nonNull(Type::id())],
            'AfterBlockID' => ['type' => Type::nonNull(Type::id())],
        ];
    }

    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
        $block = BaseElement::get_by_id($args['ID']);

        if (!$block) {
            throw new \InvalidArgumentException(sprintf(
                '%s#%s not found',
                BaseElement::class,
                $args['ID']
            ));
        }

        if (!$block->canEdit($context['currentUser'])) {
            throw new \InvalidArgumentException(
                'Changing the sort order of blocks is not allowed'
            );
        }

        $parentId = $block->ParentID;
        $blockPosition = $block->Sort;

        $sortAfterPosition = 0;
        $afterBlockID = $args['AfterBlockID'];
        if ($afterBlockID) {
            $afterBlock = BaseElement::get_by_id($afterBlockID);

            if (!$afterBlock) {
                throw new \InvalidArgumentException(
                    'Trying to sort block after a block in a different elemental area'
                );
            }
            if ($afterBlock->ParentID !== $parentId) {
                throw new \InvalidArgumentException(sprintf(
                    '%s#%s not found',
                    BaseElement::class,
                    $parentId
                ));
            }

            $sortAfterPosition = $afterBlock->Sort;
        }

        if ($sortAfterPosition < $blockPosition) {
            $operator = '+';
            $filter = "Sort > $sortAfterPosition && Sort < $blockPosition";
            $newBlockPosition = $sortAfterPosition + 1;
        } else {
            $operator = '-';
            $filter = "Sort <= $sortAfterPosition && Sort > $blockPosition";
            $newBlockPosition = $sortAfterPosition;
        }

        $table = DataObject::getSchema()->tableName(BaseElement::class);

        $query = SQLUpdate::create()
           ->setTable($table)
           ->assignSQL('"' . $table . '"."Sort"', "\"$table\".\"Sort\" $operator 1")
           ->addWhere([$filter, '"ParentId"' => $parentId]);

        $query->execute();

        $block->Sort = $newBlockPosition;
        $block->write();

        return $block;
    }
}
