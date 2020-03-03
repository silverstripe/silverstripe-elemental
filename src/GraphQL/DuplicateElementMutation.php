<?php

namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Services\ReorderElements;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use InvalidArgumentException;
use Exception;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\MutationCreator;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\GraphQL\Scaffolding\StaticSchema;

class DuplicateElementMutation extends MutationCreator implements OperationResolver
{
    public function attributes()
    {
        return [
            'name' => 'duplicateBlock',
            'description' => 'Duplicate an Element in this ElementalArea'
        ];
    }

    public function type()
    {
        return $this->manager->getType(StaticSchema::inst()->typeNameForDataObject(BaseElement::class));
    }

    public function args()
    {
        return [
            'ID' => ['type' => Type::nonNull(Type::id())],
        ];
    }

    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
        // load element to clone
        $elementID = $args['ID'];
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
        if (!$area->canEdit($context['currentUser'])) {
            throw new InvalidArgumentException(
                "The current user has insufficient permission to edit ElementalArea: $areaID"
            );
        }

        try {
            // clone element
            $clone = $element->duplicate(false);
            $clone->Title = $this->newTitle($clone->Title);
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


    public function newTitle($title)
    {
        $hasCopyPattern = '/^.*(\scopy($|\s[0-9]+$))/';
        $hasNumPattern = '/^.*(\s[0-9]+$)/';
        $parts = [];

        // does $title end with 'copy' (ignoring numbers for now)?
        if (preg_match($hasCopyPattern, $title, $parts)) {
            $copy = $parts[1];
            // does $title end with numbers?
            if (preg_match($hasNumPattern, $copy, $parts)) {
                $num = trim($parts[1]);
                $len = strlen($num);
                $inc = (int)$num + 1;
                return substr($title, 0, -$len) . "$inc";
            } else {
                return $title . ' 2';
            }
        } else {
            return $title . ' copy';
        }
    }
}
