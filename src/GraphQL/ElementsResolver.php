<?php

namespace DNADesign\Elemental\GraphQL;

use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\ORM\DataList;

class ElementsResolver implements OperationResolver
{
    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
        if (!$object->canView($context['currentUser'])) {
            throw new \Exception('Current user cannot view elements');
        }

        /** @var DataList $elements */
        $elements = $object->Elements();
        return $elements;
    }
}
