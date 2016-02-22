<?php

/**
 * @package elemental
 */
class ElementPublishChildren extends DataExtension
{

    public function onBeforeVersionedPublish()
    {
        $staged = array();

        foreach ($this->owner->Elements() as $widget) {
            $staged[] = $widget->ID;

            $widget->publish('Stage', 'Live');
        }

        // remove any elements that are on live but not in draft.
        $widgets = Versioned::get_by_stage('BaseElement', 'Live', sprintf(
            "ListID = '%$1s'", $this->owner->ID
        ));

        foreach ($widgets as $widget) {
            if (!in_array($widget->ID, $staged)) {
                $widget->deleteFromStage('Live');
            }
        }
    }
}
