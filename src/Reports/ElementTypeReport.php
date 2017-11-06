<?php

namespace DNADesign\Elemental\Reports;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\ORM\ArrayList;
use SilverStripe\Reports\Report;
use SilverStripe\View\ArrayData;
use SilverStripe\View\Requirements;

class ElementTypeReport extends Report
{
    public function title()
    {
        return _t(__CLASS__ . '.Title', 'Content block types');
    }

    public function sourceRecords($params = [])
    {
        $classes = $this->getElementTypes();
        $output = ArrayList::create();

        foreach ($classes as $class) {
            /** @var BaseElement $element */
            $element = Injector::inst()->create($class);

            $output->push(ArrayData::create([
                'Icon' => $element->getIcon(),
                'Type' => $element->getType(),
                'TypeNice' => $element->getTypeNice(),
                'ClassName' => $element->sanitiseClassName($class),
                'Total' => $class::get()->count(),
            ]));
        }

        return $output;
    }

    /**
     * Return an array of all valid classes that extend BaseElement
     *
     * @return string[]
     */
    protected function getElementTypes()
    {
        $classes = ClassInfo::subclassesFor(BaseElement::class);
        $output = [];

        foreach ($classes as $className) {
            if ($className === BaseElement::class) {
                continue;
            }

            $output[] = $className;
        }

        return $output;
    }

    public function columns()
    {
        $inUseReport = new ElementsInUseReport;

        return [
            'Icon' => [
                'title' => '',
            ],
            'Type' => [
                'title' => _t(__CLASS__ . '.Type', 'Content Type'),
                'formatting' => function ($value, $item) use ($inUseReport) {
                    return sprintf(
                        '<a class="grid-field__link" href="%s" title="%s">%s</a>',
                        $inUseReport->getLink('?filters[ClassName]='. $item->ClassName),
                        $item->Type,
                        $item->TypeNice
                    );
                },
            ],
            'Total' => [
                'title' => _t(__CLASS__ . '.Total', 'Total'),
            ],
        ];
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
