<?php
namespace DNADesign\Elemental\GraphQL\Types;

use GraphQL\Type\Definition\CustomScalarType;
use SilverStripe\GraphQL\TypeCreator;

class ObjectType extends TypeCreator
{
    public function toType()
    {
        return new CustomScalarType([
            'name' => 'ObjectType',
            'serialize' => function($value) {
                return (object) $value;
            },
            'parseValue' => function($value) {
                return (array) $value;
            },
            'parseLiteral' => function($ast) {
                return $ast->value;
            },
        ]);
    }
}
