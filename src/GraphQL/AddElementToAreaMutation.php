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
            'ClassName' => ['type' => Type::nonNull(Type::string())],
            'ElementalAreaID' => ['type' => Type::nonNull(Type::id())],
            'AfterElementID' => ['type' => Type::id()],
        ];
    }

    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
        $elementClass = $args['ClassName'];
        $elementalAreaID = $args['ElementalAreaID'];
        $afterElementID = isset($args['AfterElementID']) ? $args['AfterElementID'] : null;

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

        $newElement = Injector::inst()->create($elementClass);

        if (!$newElement->canEdit($context['currentUser'])) {
            throw new InvalidArgumentException(
                'The current user has insufficient permission to edit Elements'
            );
        }

        $elementalArea->Elements()->add($newElement);

        if (!is_null($afterElementID)) {
            $reorderer = Injector::inst()->create(ReorderElements::class, $newElement);
            $reorderer->reorder($afterElementID);
        }

        return $newElement;
    }
}
