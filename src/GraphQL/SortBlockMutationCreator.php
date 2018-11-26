<?php
namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Services\ReorderElements;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use SilverStripe\Core\Convert;
use SilverStripe\Core\Injector\Injector;
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
        $element = BaseElement::get()->byID($args['ID']);
        
        if (!$element) {
            throw new InvalidArgumentException(sprintf(
                '%s#%s not found',
                BaseElement::class,
                $args['ID']
            ));
        }

        if (!$element->canEdit($context['currentUser'])) {
            throw new InvalidArgumentException(
                'Changing the sort order of blocks is not allowed for the current user'
            );
        }

        $reorderingService = Injector::inst()->create(ReorderElements::class, $element);
        return $reorderingService->reorder($args['AfterBlockID']);
    }
}
