<?php
namespace DNADesign\Elemental\GraphQL\Types;

use GraphQL\Type\Definition\CustomScalarType;
use SilverStripe\GraphQL\TypeCreator;

/**
 * Creates a "scalar" type that is a single dimension object - represented as an associative array on the PHP side.
 */
class ObjectType extends TypeCreator
{
    public function toType()
    {
        return new CustomScalarType([
            'name' => 'ObjectType',
            'serialize' => function ($value) {
                return (object) $value;
            },
            'parseValue' => function ($value) {
                return (array) $value;
            },
            'parseLiteral' => function ($ast) {
                return $ast->value;
            },
        ]);
    }
}
