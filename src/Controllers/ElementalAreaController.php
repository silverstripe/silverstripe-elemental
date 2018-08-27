<?php
namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\DefaultFormFactory;
use SilverStripe\Forms\Form;

/**
 * Controller for "ElementalArea" - handles loading and saving of in-line edit forms in an elemental area in admin
 */
class ElementalAreaController extends LeftAndMain
{
    private static $url_segment = 'element-area';

    private static $ignore_menuitem = true;

    private static $allowed_actions = array(
        'elementForm',
        'schema',
    );

    /**
     * @param HTTPRequest|null $request
     * @return Form
     * @throws \SilverStripe\Control\HTTPResponse_Exception
     */
    public function elementForm(HTTPRequest $request = null)
    {
        // Get ID either from posted back value, or url parameter
        if (!$request) {
            $this->jsonError(400);
            return null;
        }
        $id = $request->param('ID');
        if (!$id) {
            $this->jsonError(400);
            return null;
        }
        return $this->getElementForm($id) ?: $this->jsonError(404);
    }

    /**
     * @param int $elementID
     * @return Form|null Returns null if no element exists for the given ID
     */
    public function getElementForm($elementID)
    {
        $scaffolder = Injector::inst()->get(DefaultFormFactory::class);
        $element = BaseElement::get()->byID($elementID);

        if (!$element) {
            return null;
        }

        return $scaffolder->getForm(
            $this,
            'ElementForm_'.$elementID,
            ['Record' => $element]
        );
    }
}
