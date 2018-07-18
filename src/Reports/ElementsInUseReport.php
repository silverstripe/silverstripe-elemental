<?php

namespace DNADesign\Elemental\Reports;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\ORM\DataList;
use SilverStripe\Reports\Report;
use SilverStripe\View\Requirements;

class ElementsInUseReport extends Report
{
    public function title()
    {
        return _t(__CLASS__ . '.ReportTitle', 'Content blocks in use');
    }

    public function sourceRecords($params = [])
    {
        /** @var DataList $elements */
        $elements = BaseElement::get()->exclude(['ClassName' => BaseElement::class]);

        if (isset($params['ClassName'])) {
            $className = $this->unsanitiseClassName($params['ClassName']);
            $elements = $elements->filter(['ClassName' => $className]);
        }

        return $elements;
    }

    public function columns()
    {
        return [
            'Icon' => [
                'title' => '',
                'formatting' => function ($value, BaseElement $item) {
                    return $item->getIcon();
                },
            ],
            'Title' => [
                'title' => _t(__CLASS__ . '.Title', 'Title'),
                'formatting' => function ($value, BaseElement $item) {
                    $value = $item->Title;

                    if (!empty($value)) {
                        if ($item->CMSEditLink()) {
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
                'formatting' => function ($value, BaseElement $item) {
                    return $item->getSummary();
                },
            ],
            'Type' => [
                'title' => _t(__CLASS__ . '.Type', 'Type'),
                'formatting' => function ($value, BaseElement $item) {
                    return $item->getTypeNice();
                },
            ],
            'Page.Title' => [
                'title' => _t(__CLASS__ . '.Page', 'Page'),
                'formatting' => function ($value, BaseElement $item) {
                    if ($value) {
                        return $this->getEditLink($value, $item);
                    }
                    return $item->getPageTitle();
                },
            ],
        ];
    }

    /**
     * Helper method to return the link to edit an element
     *
     * @param string $value
     * @param BaseElement $item
     * @return string
     */
    protected function getEditLink($value, $item)
    {
        return sprintf(
            '<a class="grid-field__link" href="%s" title="%s">%s</a>',
            $item->CMSEditLink(),
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

    /**
     * Unsanitise a model class' name from a URL param
     *
     * See {@link \SilverStripe\Admin\ModelAdmin::unsanitiseClassName}
     *
     * @param string $class
     * @return string
     */
    protected function unsanitiseClassName($class)
    {
        return str_replace('-', '\\', $class);
    }
}
