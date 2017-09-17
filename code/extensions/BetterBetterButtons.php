<?php


/**
 * @package elemental
 */
class BetterBetterButtons extends GridFieldBetterButtonsItemRequest
{

    /**
     * Needed to add proper permissions around buttons
     *
     * @param Form The ItemEditForm object
     */
    public function updateItemEditForm($form) {
        parent::updateItemEditForm($form);
        $actions = $form->Actions();
        if (!$this->owner->record->canDelete()) {
            $actions->removeByName('action_doDelete');
            $actions->removeByName('action_cancelDelete');
        }
    }
}
