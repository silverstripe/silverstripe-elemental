<?php

namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Services\ReorderElements;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use InvalidArgumentException;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\MutationCreator;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\GraphQL\Scaffolding\StaticSchema;

if (!class_exists(MutationCreator::class)) {
    return;
}

/**
 * @deprecated 4.8..5.0 Use silverstripe/graphql:^4 functionality.
 */
class AddElementToAreaMutation extends MutationCreator implements OperationResolver
{
    public function attributes()
    {
        return [
            'name' => 'addElementToArea',
            'description' => 'Adds an Element to an ElementalArea, optionally after another Element'
        ];
    }

    public function type()
    {
        return $this->manager->getType(StaticSchema::inst()->typeNameForDataObject(BaseElement::class));
    }

    public function args()
    {
        return [
            'className' => ['type' => Type::nonNull(Type::string())],
            'elementalAreaID' => ['type' => Type::nonNull(Type::id())],
            'afterElementID' => ['type' => Type::id()],
        ];
    }

    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
        $elementClass = $args['className'];
        $elementalAreaID = $args['elementalAreaID'];
        $afterElementID = isset($args['afterElementID']) ? $args['afterElementID'] : null;

        if (!is_subclass_of($elementClass, BaseElement::class)) {
            throw new InvalidArgumentException("$elementClass is not a subclass of " . BaseElement::class);
        }

        $elementalArea = ElementalArea::get()->byID($elementalAreaID);

        if (!$elementalArea) {
            throw new InvalidArgumentException("Invalid ElementalAreaID: $elementalAreaID");
        }

        if (!$elementalArea->canEdit($context['currentUser'])) {
            throw new InvalidArgumentException("The current user has insufficient permission to edit ElementalAreas");
        }

        /** @var BaseElement $newElement */
        $newElement = Injector::inst()->create($elementClass);

        if (!$newElement->canEdit($context['currentUser'])) {
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
}
