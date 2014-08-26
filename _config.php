<?php

// Set the local
i18n::set_locale('en_NZ');
// To add simple address fields to an object, use
Object::add_extension('ElementContact', 'Addressable');
// To add automatic geocoding to an object with the Addressable extension,
// use:
// Object::add_extension('ElementContact', 'Geocodable');