<?php
namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use SilverStripe\Core\Convert;
use SilverStripe\GraphQL\MutationCreator;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\GraphQL\Scaffolding\StaticSchema;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\Queries\SQLUpdate;

/**
 * Given a source block ID and the ID of the block to reorder the source block after, update all affected sort
 * orders for the block and its siblings. Only the source block will have a new version written, all siblings
 * will be updated underneath the ORM to avoid this.
 */
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
        return $this->manager->getType(StaticSchema::inst()->typeNameForDataObject(BaseElement::class));
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
        /** @var BaseElement $block */
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
        $blockPosition = (int) $block->Sort;

        $sortAfterPosition = 0;
        $afterBlockID = $args['AfterBlockID'];
        if ($afterBlockID) {
            /** @var BaseElement $afterBlock */
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

            $sortAfterPosition = (int) $afterBlock->Sort;
        }

        // We are updating records with SQL queries to avoid the ORM triggering the creation of new versions
        // for each element that is affected by this reordering.
        $tableName = Convert::raw2sql(DataObject::getSchema()->tableName(BaseElement::class));

        if ($sortAfterPosition < $blockPosition) {
            $operator = '+';
            $filter = "\"$tableName\".\"Sort\" > $sortAfterPosition AND \"$tableName\".\"Sort\" < $blockPosition";
            $newBlockPosition = $sortAfterPosition + 1;
        } else {
            $operator = '-';
            $filter = "\"$tableName\".\"Sort\" <= $sortAfterPosition AND \"$tableName\".\"Sort\" > $blockPosition";
            $newBlockPosition = $sortAfterPosition;
        }

        $query = SQLUpdate::create()
           ->setTable("\"$tableName\"")
           ->assignSQL('"Sort"', "\"$tableName\".\"Sort\" $operator 1")
           ->addWhere([$filter, "\"$tableName\".\"ParentID\"" => $parentId]);

        $query->execute();

        // Now use the ORM to write a new version of the record that we are directly reordering
        $block->Sort = $newBlockPosition;
        $block->write();

        return $block;
    }
}
