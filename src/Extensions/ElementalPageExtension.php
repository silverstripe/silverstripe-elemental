<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\View\Parsers\HTML4Value;
use SilverStripe\Control\Controller;

class ElementalPageExtension extends ElementalAreasExtension
{
    /**
     * @var array
     */
    private static $has_one = [
        'ElementalArea' => ElementalArea::class
    ];

    /**
     * @var array
     */
    private static $owns = [
        'ElementalArea'
    ];

    public function MetaTags(&$tags)
    {
        $controller = Controller::curr();
        $request = $controller->getRequest();
        if($request->getVar('ElementalPreview') !== null) {
            $html = HTML4Value::create($tags);
            $xpath = "//meta[@name='x-page-id' or @name='x-cms-edit-link']";
            $removeTags = $html->query($xpath);
            $body = $html->getBody();
            foreach($removeTags as $tag) {
              $body->removeChild($tag);
            }
            $tags = $html->getContent();
        }
        return $tags;
    }
}
