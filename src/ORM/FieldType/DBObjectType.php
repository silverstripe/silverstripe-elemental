<?php
namespace DNADesign\Elemental\ORM\FieldType;

use SilverStripe\GraphQL\Manager;
use SilverStripe\ORM\FieldType\DBField;
use SilverStripe\Dev\Deprecation;

/**
 * @deprecated 5.3.0 Will be removed without equivalent functionality to replace it in a future major release
 */
class DBObjectType extends DBField
{
    public function __construct()
    {
        Deprecation::withSuppressedNotice(function () {
            $message = 'Will be removed without equivalent functionality to replace it';
            Deprecation::notice('5.3.0', $message, Deprecation::SCOPE_CLASS);
        });
    }

    /**
     * Add the field to the underlying database.
     */
    public function requireField()
    {
        // noop - This class exists only to bind to a custom GraphQL type
    }

    public function getGraphQLType(Manager $manager)
    {
        return $manager->getType('ObjectType');
    }
}
