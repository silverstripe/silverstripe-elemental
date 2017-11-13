<?php

namespace DNADesign\Elemental\Reports;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\ORM\ArrayList;
use SilverStripe\Reports\Report;
use SilverStripe\View\ArrayData;
use SilverStripe\View\Requirements;

class ElementsInUseReport extends Report
{
    public function title()
    {
        return _t(__CLASS__ . '.ReportTitle', 'Content blocks in use');
    }

    public function sourceRecords($params = [])
    {
        /** @var BaseElement[] $elements */
        $elements = BaseElement::get();

        $output = ArrayList::create();

        foreach ($elements as $element) {
            // Skip if filtering and looking at a different record
            if (isset($params['ClassName']) && $params['ClassName'] !== $element->sanitiseClassName($element)) {
                continue;
            }

            $output->push(ArrayData::create([
                'Icon' => $element->getIcon(),
                'Title' => $element->Title,
                'EditLink' => $element->CMSEditLink(),
                'Summary' => $element->getSummary(),
                'Type' => $element->getTypeNice(),
                'ClassName' => $element->sanitiseClassName(get_class($element)),
                'Page' => $element->getPageTitle(),
            ]));
        }

        return $output;
    }

    public function columns()
    {
        return [
            'Icon' => [
                'title' => '',
            ],
            'Title' => [
                'title' => _t(__CLASS__ . '.Title', 'Title'),
                'formatting' => function ($value, $item) {
                    if (!empty($value)) {
                        if ($item->EditLink) {
                            return $this->getEditLink($value, $item);
                        }
                        return $value;
                    }
                    return '<span class="element__note">' . _t(__CLASS__ . '.None', 'None') . '</span>';
                },
            ],
            'Summary' => [
                'title' => _t(__CLASS__ . '.Summary', 'Summary'),
                'casting' => 'HTMLText->RAW',
            ],
            'Type' => [
                'title' => _t(__CLASS__ . '.Type', 'Type'),
            ],
            'Page' => [
                'title' => _t(__CLASS__ . '.Page', 'Page'),
                'formatting' => function ($value, $item) {
                    if ($value) {
                        return $this->getEditLink($value, $item);
                    }
                },
            ],
        ];
    }

    /**
     * Helper method to return the link to edit an element
     *
     * @param string $value
     * @param ArrayData $item
     * @return string
     */
    protected function getEditLink($value, $item)
    {
        return sprintf(
            '<a class="grid-field__link" href="%s" title="%s">%s</a>',
            $item->EditLink,
            $value,
            $value
        );
    }

    /**
     * Add elemental CSS and a unique class name to the GridField
     *
     * @return GridField
     */
    public function getReportField()
    {
        Requirements::css('dnadesign/silverstripe-elemental:client/dist/styles/bundle.css');

        /** @var GridField $field */
        $field = parent::getReportField();
        $field->addExtraClass('elemental-report__grid-field');

        return $field;
    }
}
