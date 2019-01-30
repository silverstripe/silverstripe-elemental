<?php

namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\ElementalArea;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\OperationResolver;

class ReadOneAreaResolver implements OperationResolver
{
    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
        $area = ElementalArea::get()->byID($args['ID']);

        if (!$area->canView($context['currentUser'])) {
            throw new \Exception('Current user cannot view element areas');
        }

        return $area;
    }
}
