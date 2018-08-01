<?php
namespace DNADesign\Elemental\ORM\FieldType;

use SilverStripe\GraphQL\Manager;
use SilverStripe\ORM\FieldType\DBField;

class DBObjectType extends DBField
{
    /**
     * Add the field to the underlying database.
     */
    public function requireField()
    {
        // I am mad that I have to add this.
    }

    public function getGraphQLType(Manager $manager)
    {
        return $manager->getType('ObjectType');
    }
}
