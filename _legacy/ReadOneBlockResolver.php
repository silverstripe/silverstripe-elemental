<?php


namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\CRUD\ReadOne;
use SilverStripe\GraphQL\Scaffolding\StaticSchema;

if (!class_exists(ReadOne::class)) {
    return;
}

/**
 * @deprecated 4.8..5.0 Use silverstripe/graphql:^4 functionality.
 */
class ReadOneBlockResolver
{
    public static function resolve($obj, array $args, array $context, ResolveInfo $info)
    {
        $idKey = StaticSchema::inst()->formatField('ID');
        $id = $args['filter'][$idKey]['eq'];
        $readOne = Injector::inst()->createWithArgs(ReadOne::class, [BaseElement::class]);
        unset($args['filter']);
        $args[$idKey] = $id;
        return $readOne->resolve($obj, $args, $context, $info);
    }
}
