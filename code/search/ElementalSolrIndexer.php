<?php

class ElementalSolrIndexer {

    const ELEMENTAL_FIELD_NAME = 'Elemental_Element';

    /**
     *
     */
    public function updateFieldDefinition($xml) {
        $xml .= "\n\t\t<field name='". self::ELEMENTAL_FIELD_NAME. "_ID' type='int' indexed='true' stored='true' multiValued='true' />";

        return $xml;
    }

    /**
     *
     */
    public function elementPageChanged($object, $doc) {
        if($object->hasMethod('ElementArea')) {
            $dirty = array();

            foreach($object->ElementArea()->WidgetControllers() as $element) {
                $doc->addField(self::ELEMENTAL_FIELD_NAME . '_ID', $element->ID);

                // if this page has virtual clones on another page make sure that we also update the Solr index for
                // those pages automatically.
                foreach($element->VirtualClones() as $clone) {
                    $dirty[$clone->ID] = $clone->ID;
                }
            }
        }

        $this->publishDirtyClones($dirty);
    }

    /**
     * @todo
     */
    public function publishDirtyClones($dirty) {
        foreach($dirty as $id) {

        }
    }
}
