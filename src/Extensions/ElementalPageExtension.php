<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\View\Parsers\HTML4Value;
use SilverStripe\Control\Controller;
use SilverStripe\Forms\FieldList;

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
        if ($request->getVar('ElementalPreview') !== null) {
            $html = HTML4Value::create($tags);
            $xpath = "//meta[@name='x-page-id' or @name='x-cms-edit-link']";
            $removeTags = $html->query($xpath);
            $body = $html->getBody();
            foreach ($removeTags as $tag) {
                $body->removeChild($tag);
            }
            $tags = $html->getContent();
        }
    }

    public function updateCMSFields(FieldList $fields)
    {
        $fields = parent::updateCMSFields($fields);
        $gf = $fields->dataFieldByName('ElementalArea');
        $cfg = $gf->getConfig();
        $cfg->removeComponentsByType([
            '\SilverStripe\Forms\GridField\GridFieldEditButton',
            '\SilverStripe\Forms\GridField\GridFieldDeleteAction',
            // Detail form will be added back, but a lower priority order for route processing
            // We need MeatballMenu to handle the same routes. Detail form is required by
            // \Symbiote\GridFieldExtensions\GridFieldAddNewMultiClass so can't just be removed,
            // since it AddNewMultiClass is also utilised by Elemental.
            '\SilverStripe\Forms\GridField\GridFieldDetailForm'
        ]);
        $cfg->addComponents(
            new \Symbiote\GridFieldExtensions\GridFieldMeatballMenuComponent,
            new \SilverStripe\Forms\GridField\GridFieldDetailForm
        );
        return $fields;
    }
}
