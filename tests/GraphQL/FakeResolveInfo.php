<?php

namespace DNADesign\Elemental\Tests\GraphQL;

use GraphQL\Type\Definition\FieldDefinition;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;

class FakeResolveInfo extends ResolveInfo
{
    public function __construct()
    {
        // webonyx/graphql-php v0.12
        if (!property_exists(__CLASS__, 'fieldDefinition')) {
            return;
        }
        // webonyx/graphql-php v14
        parent::__construct(
            FieldDefinition::create(['name' => 'fake', 'type' => Type::string()]),
            [],
            new ObjectType(['name' => 'fake']),
            [],
            new Schema([]),
            [],
            '',
            null,
            []
        );
    }
}
