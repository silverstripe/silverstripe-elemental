<?php


namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use GraphQL\Type\Definition\Type;
use SilverStripe\GraphQL\MutationCreator;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\CRUD\Delete;

if (!class_exists(MutationCreator::class)) {
    return;
}

/**
 * @deprecated 4.8..5.0 Use silverstripe/graphql:^4 functionality.
 */
class DeleteBlocksMutation extends MutationCreator
{
    public function attributes()
    {
        return [
            'name' => 'deleteBlocks',
        ];
    }

    public function type()
    {
        return Type::listOf(Type::id());
    }

    public function args()
    {
        return [
            'ids' => Type::nonNull(Type::listOf(Type::id())),
        ];
    }

    public function getResolver()
    {
        $delete = new Delete(BaseElement::class);
        return [$delete, 'resolve'];
    }
}
