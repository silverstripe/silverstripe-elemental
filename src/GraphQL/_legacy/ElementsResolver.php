<?php

namespace DNADesign\Elemental\GraphQL;

use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\ORM\DataList;

if (!interface_exists(OperationResolver::class)) {
    return;
}

class ElementsResolver implements OperationResolver
{
    /**
     * @param mixed $object
     * @param array $args
     * @param mixed $context
     * @param ResolveInfo $info
     * @return mixed|DataList
     * @throws \Exception
     */
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
