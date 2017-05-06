<?php

/**
 * @package elemental
 */
class ElementalAdmin extends ModelAdmin {

    private static $managed_models = array(
        'BaseElement'
    );

    private static $menu_title = 'Content Elements';

    private static $url_segment = 'elemental';

    private static $menu_icon = 'elemental/images/blocks.svg';

    public function getEditForm($id = null, $fields = null) {
        $form = parent::getEditForm($id, $fields);

        $grid = $form->Fields()
            ->dataFieldByName($this->sanitiseClassName($this->modelClass));

        $config = $grid->getConfig();
        $config->removeComponentsByType('GridFieldAddNewButton');
        $dataCols = $config->getComponentByType('GridFieldDataColumns');
        $fields = $dataCols->getDisplayFields($grid);
        $fields['PageCMSEditLink'] = 'Used on';
        $dataCols->setDisplayFields($fields);
        return $form;
    }

    /**
     * Exclude our linked elements
     *
     * @return DataList
     */
    public function getList() {
        $list = parent::getList();
        //$list = $list->exclude('ClassName', 'ElementVirtualLinked');

        return $list;
    }
}
