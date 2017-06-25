<?php

namespace SilverStripe\Elemental\Controllers;

use SilverStripe\Elemental\Models\BaseElement;
use SilverStripe\Admin\ModelAdmin;
use SilverStripe\Forms\NumericField;

/**
 * @package elemental
 */
class ElementalAdmin extends ModelAdmin {

    private static $managed_models = array(
        BaseElement::class
    );

    private static $menu_title = 'Content Elements';

    private static $url_segment = 'elemental';

    private static $menu_icon = 'elemental/images/blocks.svg';

    public function getEditForm($id = null, $fields = null) {
        $form = parent::getEditForm($id, $fields);

        $grid = $form->Fields()
            ->dataFieldByName($this->sanitiseClassName($this->modelClass));

        $config = $grid->getConfig();
        $config->removeComponentsByType('SilverStripe\Forms\GridField\GridFieldAddNewButton');
        $dataCols = $config->getComponentByType('SilverStripe\Forms\GridField\GridFieldDataColumns');
        $fields = $dataCols->getDisplayFields($grid);
        $fields['UsageSummary'] = 'Usage Summary';
        $dataCols->setDisplayFields($fields);
        return $form;
    }

    // /**
    //  * Exclude our linked elements
    //  *
    //  * @return DataList
    //  */
    // public function getList() {
    //     $list = parent::getList();
    //     //$list = $list->exclude('ClassName', 'ElementVirtualLinked');

    //     return $list;
    // }
}
