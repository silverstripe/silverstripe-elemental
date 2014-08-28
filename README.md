# Silverstripe Elemental (DataExtension)

## Introduction
Extends page type to swap the content area for a gridfield and manageable elements (widgets)
The module has 7 elements by default:
- File
- Internal Link
- External Link
- Image
- Content (HTML)
- Contact
- List (by default, list of Internal/External links and File)

## Requirements
- Silverstripe 3.1
- [ajshort/silverstripe-gridfieldextensions](https://github.com/ajshort/silverstripe-gridfieldextensions)
- [ajshort/silverstripe-addressable](https://github.com/ajshort/silverstripe-addressable)

## Configuration
- Extends any page type with the ElementPageExtension and define allowed elements
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
- By default, all Element List can contain Internal/External links and File. To add/remove allowed elements in list, edit yml config:
````
	ElementList:
	  allowed_elements:
	    'ElementFile' : 'File'
	    'ElementInternalLink' : 'Internal Link'
	    'ElementExternalLink' : 'External Link'
````
- Extra CSS classes can be configure in the yml config file. By default, the Image element comes with 3 optional classes:
````
	ElementImage:
	  css_styles:
	    - 'image_large' : 'Large'
	    - 'image_medium' : 'Normal'
	    - 'image_small' : 'Small'
````
## Installation
Install the module through composer:
````
composer require dnadesign/silverstripe-elemental
````
Alternatively, clone this repo in your silverstripe website root folder, run dev/build.

