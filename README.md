# SilverStripe Elemental

## Introduction

This module extends a page type to swap the content area for a GridField and manageable elements (widgets) to compose
a page out of rather than a single text field.

The module has 7 elements by default and can be extended with your own instances of `BaseElement`

- File
- Internal Link
- External Link
- Image
- Content (HTML)
- Contact
- List (by default, list of Internal/External links and File)

Versioning and search indexing are supported out of the box.

## Installation

	composer require "dnadesign/silverstripe-elemental" "dev-master"

## Requirements

- Silverstripe 3.1
- [ajshort/silverstripe-gridfieldextensions](https://github.com/ajshort/silverstripe-gridfieldextensions)
- [ajshort/silverstripe-addressable](https://github.com/ajshort/silverstripe-addressable)

## Configuration

Extend any page type with the ElementPageExtension and define allowed elements. This can be done via the SilverStripe
`YAML` config API

**mysite/_config/app.yml**

```
	Page:
	  extensions:
	    - ElementPageExtension
	  allowed_elements:
	    'ElementContent' : 'Content'
	    'ElementImage' : 'Image'
	    'ElementContact' : 'Contact'
	    'ElementList' : 'Element List'
	    'ElementExternalLink' : 'External Link'
	    'ElementInternalLink' : 'Internal Link'
	    'ElementFile' : 'File'
````

By default, all Element List can contain Internal/External links and File. To add / remove allowed elements in list.

````
	ElementList:
	  allowed_elements:
	    'ElementFile' : 'File'
	    'ElementInternalLink' : 'Internal Link'
	    'ElementExternalLink' : 'External Link'
````

Extra CSS classes can be configure in the `YAML` config file. By default, the Image element comes with 3 optional
classes:

````
	ElementImage:
	  css_styles:
	    - 'image_large' : 'Large'
	    - 'image_medium' : 'Normal'
	    - 'image_small' : 'Small'
````

### Defining your own element.

An element is as simple as a class which extends `BaseElement`. After you add the class, ensure you have rebuilt your
database and reload the CMS.

	<?php

	class MyElement extends BaseElement {

		private static $title = "My Element";
		private static $description = "My Custom Element";

		public function getCMSFields() {
			// ...
		}
	}

	class MyElement_Controller extends BaseElement_Controller {

	}

MyElement will be rendered into a MyElement.ss template.

### Screenshots

![Overview](docs/images/overview.png)

![Detail](docs/images/detail.png)