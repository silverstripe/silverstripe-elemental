<?php

namespace DNADesign\Elemental\Reports;

use DNADesign\Elemental\Models\BaseElement;
use InvalidArgumentException;
use Psr\Log\LoggerInterface;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\ORM\DataList;
use SilverStripe\Reports\Report;
use SilverStripe\View\ArrayData;
use SilverStripe\View\Requirements;

class ElementsInUseReport extends Report
{
    /**
     * The string used in GET params to filter the records in this report by element type
     *
     * @var string
     */
    const CLASS_NAME_FILTER_KEY = 'ClassName';

    public function title()
    {
        return _t(__CLASS__ . '.ReportTitle', 'Content blocks in use');
    }

    public function sourceRecords($params = [])
    {
        $elements = BaseElement::get()->exclude(['ClassName' => BaseElement::class]);

        if (isset($params[static::CLASS_NAME_FILTER_KEY])) {
            $className = $this->unsanitiseClassName($params[static::CLASS_NAME_FILTER_KEY]);
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
                        if ($link = $item->CMSEditLink()) {
                            return $this->getEditLink($value, $link);
                        }
                        return $value;
                    }
                    return '<span class="element__note">' . _t(__CLASS__ . '.None', 'None') . '</span>';
                },
            ],
            'ElementSummary' => [
                'title' => _t(__CLASS__ . '.Summary', 'Summary'),
                'casting' => 'HTMLText->RAW',
                'formatting' => function ($value, BaseElement $item) {
                    try {
                        return $item->getSummary();
                    } catch (InvalidArgumentException $exception) {
                         // Don't break the report, just continue. Image manipulation is an example which may
                         // throw exceptions here.
                        Injector::inst()->get(LoggerInterface::class)->debug(
                            'Element #' . $item->ID . ' threw exception in ElementInUseReport via getSummary(): '
                            . $exception->getMessage()
                        );
                        return '';
                    }
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
                        if ($link = $item->getPage()->CMSEditLink()) {
                            return $this->getEditLink($value, $link);
                        }
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
     * @param string $link
     * @return string
     */
    protected function getEditLink($value, $link)
    {
        return sprintf(
            '<a class="grid-field__link" href="%s" title="%s">%s</a>',
            $link,
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
     * When used with silverstripe/reports >= 4.4, this method will automatically be added as breadcrumbs
     * leading up to this report.
     *
     * @return ArrayData[]
     */
    public function getBreadcrumbs()
    {
        $params = $this->getSourceParams();

        // Only apply breadcrumbs if a "ClassName" filter is applied. This implies that we came from the
        // "element type report".
        if (!isset($params[static::CLASS_NAME_FILTER_KEY])) {
            return [];
        }

        $report = ElementTypeReport::create();

        return [ArrayData::create([
            'Title' => $report->title(),
            'Link' => $report->getLink(),
        ])];
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
        return str_replace('-', '\\', $class ?? '');
    }
}
