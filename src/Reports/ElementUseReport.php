<?php

use SilverStripe\Reports\Report;
use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\ORM\ArrayList;
use SilverStripe\View\ArrayData;
use SilverStripe\Core\Convert;

class ElementUseReport extends Report
{
    protected $title = 'Content Blocks in Use';

    protected $description = 'Show what Content Blocks are being used.';

    public function getCount($params = array())
    {
        return BaseElement::get()->count();
    }

    public function sourceRecords($params = [])
    {
        if (empty($params)) {
            $classes = ClassInfo::subclassesFor(BaseElement::class);
            $output = new ArrayList();

            foreach ($classes as $class) {
                if ($class === BaseElement::class) {
                    continue;
                }

                $inst = Injector::inst()->create($class);

                $output->push(new ArrayData([
                    'Icon' => $inst->getIcon(),
                    'Title' => $inst->getTypeNice(),
                    'ClassName' => $inst->sanitiseClassName($class),
                    'Total' => $class::get()->count()
                ]));
            }

            return $output;
        } elseif (isset($params['ClassName'])) {
            $convertClass = Injector::inst()->create(BaseElement::class)->unsanitiseClassName($params['ClassName']);

            if (ClassInfo::exists($convertClass)) {
                return $convertClass::get()->sort('Title', 'ASC');
            } else {
            }
        }
    }

    public function columns()
    {
        $params = $this->params;

        if (empty($params)) {
            return [
                'Icon' => [
                    'title' => ''
                ],
                'Title' => [
                    'title' => _t(__CLASS__.'.Title', 'Content Type')
                ],
                'Total' => [
                    'title' => _t(__CLASS__.'.Total', 'Total'),
                    'link' => function ($value, $item) {
                        return sprintf(
                            '<a class="grid-field__link" href="%s" title="%s">%s</a>',
                            Convert::raw2att($this->getLink('?filters[ClassName]='. $item->ClassName)),
                            Convert::raw2att($value),
                            Convert::raw2xml($value)
                        );
                    }
                ]
            ];
        } else {
            return [
                'EditorPreview' => [
                    'title' => ''
                ],
                'PageTitle' => [
                    'title' => _t(__CLASS__.'.Page', 'Page'),
                    'link' => true
                ]
            ];
        }
    }
}
