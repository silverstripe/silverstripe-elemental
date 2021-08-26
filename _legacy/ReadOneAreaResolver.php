<?php

namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\ElementalArea;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use InvalidArgumentException;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\GraphQL\Scaffolding\StaticSchema;

if (!interface_exists(OperationResolver::class)) {
    return;
}

/**
 * @deprecated 4.8..5.0 Use silverstripe/graphql:^4 functionality.
 */
class ReadOneAreaResolver implements OperationResolver
{
    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
        $idKey = StaticSchema::inst()->formatField('ID');
        $id = $args['filter'][$idKey]['eq'];
        $area = ElementalArea::get()->byID($id);

        if (!$area) {
            throw new InvalidArgumentException('Could not find elemental area matching ID ' . $id);
        }

        if (!$area->canView($context['currentUser'])) {
            throw new Exception('Current user cannot view element areas');
        }

        return $area;
    }
}
