<?php

//
ContentController::remove_extension('WidgetContentControllerExtension');
ContentController::add_extension('ElementalContentControllerExtension');

if (!class_exists('SS_Object')) {
    class_alias('Object', 'SS_Object');
}
