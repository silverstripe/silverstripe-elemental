<?php

// To add simple address fields to an object, use
Object::add_extension('ElementContact', 'Addressable');

// To add automatic geocoding to an object with the Addressable extension
Object::add_extension('ElementContact', 'Geocodable');