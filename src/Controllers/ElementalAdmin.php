<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Models\BaseElement;

use SilverStripe\Admin\ModelAdmin;
use SilverStripe\Forms\GridField\GridFieldAddNewButton;
use SilverStripe\Forms\GridField\GridFieldDataColumns;
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
        // remove add button, as elements are created in the page dialog
        $config->removeComponentsByType(GridFieldAddNewButton::class);
        // add new field which isn't shown in page dialog
        $dataCols = $config->getComponentByType(GridFieldDataColumns::class);
        $fields = $dataCols->getDisplayFields($grid);
        $fields['UsageSummary'] = 'Usage Summary';
        $dataCols->setDisplayFields($fields);
        return $form;
    }
}
