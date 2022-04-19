<?php

namespace DNADesign\Elemental\GraphQL\Resolvers;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Services\ReorderElements;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\QueryHandler\QueryHandler;
use SilverStripe\GraphQL\QueryHandler\UserContextProvider;
use SilverStripe\ORM\ValidationException;
use InvalidArgumentException;
use Exception;

class Resolver
{
    /**
     * @param $value
     * @return object
     */
    public static function serialiseObjectType($value)
    {
        return (object) $value;
    }

    /**
     * @param $value
     * @return array
     */
    public static function parseValueObjectType($value)
    {
        return (array) $value;
    }

    /**
     * @param $ast
     * @return mixed
     */
    public static function parseLiteralObjectType($ast)
    {
        return $ast->value;
    }

    /**
     * @param $obj
     * @param array $args
     * @param array $context
     * @param ResolveInfo $info
     * @return BaseElement
     * @throws ValidationException
     * @throws InvalidArgumentException
     */
    public static function resolveAddElementToArea(
        $obj,
        array $args,
        array $context,
        ResolveInfo $info
    ): BaseElement {
        $elementClass = $args['className'];
        $elementalAreaID = $args['elementalAreaID'];
        $afterElementID = $args['afterElementID'] ?? null;

        if (!is_subclass_of($elementClass, BaseElement::class)) {
            throw new InvalidArgumentException("$elementClass is not a subclass of " . BaseElement::class);
        }

        $elementalArea = ElementalArea::get()->byID($elementalAreaID);

        if (!$elementalArea) {
            throw new InvalidArgumentException("Invalid ElementalAreaID: $elementalAreaID");
        }

        $member = UserContextProvider::get($context);
        if (!$elementalArea->canEdit($member)) {
            throw new InvalidArgumentException("The current user has insufficient permission to edit ElementalAreas");
        }

        /** @var BaseElement $newElement */
        $newElement = Injector::inst()->create($elementClass);

        $member = UserContextProvider::get($context);
        if (!$newElement->canEdit($member)) {
            throw new InvalidArgumentException(
                'The current user has insufficient permission to edit Elements'
            );
        }

        // Assign the parent ID directly rather than via HasManyList to prevent multiple writes.
        // See BaseElement::$has_one for the "Parent" naming.
        $newElement->ParentID = $elementalArea->ID;
        // Ensure that a sort order is assigned - see BaseElement::onBeforeWrite()
        $newElement->onBeforeWrite();

        if ($afterElementID !== null) {
            /** @var ReorderElements $reorderer */
            $reorderer = Injector::inst()->create(ReorderElements::class, $newElement);
            $reorderer->reorder($afterElementID); // also writes the element
        } else {
            $newElement->write();
        }

        return $newElement;
    }

    /**
     * @param $object
     * @param array $args
     * @param $context
     * @param ResolveInfo $info
     * @return BaseElement
     * @throws ValidationException
     */
    public static function resolveDuplicateBlock($object, array $args, $context, ResolveInfo $info)
    {
        // load element to clone
        $elementID = $args['id'];
        $element = BaseElement::get_by_id($elementID);
        if (!$element) {
            throw new InvalidArgumentException("Invalid BaseElementID: $elementID");
        }

        // check can edit the elemental area
        $areaID = $element->ParentID;
        $area = ElementalArea::get_by_id($areaID);
        if (!$area) {
            throw new InvalidArgumentException("Invalid ParentID on BaseElement: $elementID");
        }
        $member = UserContextProvider::get($context);
        if (!$area->canEdit($member)) {
            throw new InvalidArgumentException(
                "The current user has insufficient permission to edit ElementalArea: $areaID"
            );
        }

        try {
            // clone element
            $clone = $element->duplicate(false);
            $clone->Title = static::newTitle($clone->Title ?? '');
            $clone->Sort = 0; // must be zeroed for reorder to work
            $area->Elements()->add($clone);

            // reorder
            $reorderer = Injector::inst()->create(ReorderElements::class, $clone);
            $reorderer->reorder($elementID);

            return $clone;
        } catch (Exception $e) {
            throw new Exception("Something went wrong when duplicating element: $elementID");
        }
    }

    public static function newTitle(string $title = ''): ?string
    {
        $hasCopyPattern = '/^.*(\scopy($|\s[0-9]+$))/';
        $hasNumPattern = '/^.*(\s[0-9]+$)/';
        $parts = [];

        // does $title end with 'copy' (ignoring numbers for now)?
        if (preg_match($hasCopyPattern ?? '', $title ?? '', $parts)) {
            $copy = $parts[1];
            // does $title end with numbers?
            if (preg_match($hasNumPattern ?? '', $copy ?? '', $parts)) {
                $num = trim($parts[1] ?? '');
                $len = strlen($num ?? '');
                $inc = (int)$num + 1;
                return substr($title ?? '', 0, -$len) . "$inc";
            } else {
                return $title . ' 2';
            }
        } else {
            return $title . ' copy';
        }
    }

    public static function resolveSortBlock($object, array $args, $context, ResolveInfo $info)
    {
        $element = BaseElement::get()->byID($args['id']);

        if (!$element) {
            throw new InvalidArgumentException(sprintf(
                '%s#%s not found',
                BaseElement::class,
                $args['ID']
            ));
        }
        $member = UserContextProvider::get($context);
        if (!$element->canEdit($member)) {
            throw new InvalidArgumentException(
                'Changing the sort order of blocks is not allowed for the current user'
            );
        }

        $reorderingService = Injector::inst()->create(ReorderElements::class, $element);
        return $reorderingService->reorder($args['afterBlockID']);
    }
}
