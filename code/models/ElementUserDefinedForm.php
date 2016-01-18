<?php

/**
 * @package elemental
 */
class ElementUserDefinedForm extends BaseElement
{
    
    private static $has_one = array(
        'Form' => 'UserDefinedForm'
    );

    private static $title = "Form Element";

    public function ElementForm()
    {
        if ($this->Form()->exists()) {
            $controller = new UserDefinedForm_Controller($this->Form());

            $current = Controller::curr();

            if ($current && $current->getAction() == 'finished') {
                return $controller->renderWith('ReceivedFormSubmission');
            }

            $form = $controller->Form();

            return $form;
        }
    }
}
