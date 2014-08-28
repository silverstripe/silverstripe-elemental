# Silverstripe Elemental 

## Introduction
Elemental is a module that provides silverstripe with a pagetype ElementPage which content is made of Elements (widgets) manageable via a gridfield.
The module has 7 elements by default:
- File
- Internal Link
- External Link
- Image
- Content (HTML)
- Contact
- List (by default, list of Internal/External links and File)

## Requirements
- Silvertsripe 3.1
- [ajshort/silverstripe-gridfieldextensions](https://github.com/ajshort/silverstripe-gridfieldextensions)
- [ajshort/silverstripe-addressable](https://github.com/ajshort/silverstripe-addressable)

## Configuration
- By default, all Elements can be added to an ElementPage. To restrict the list of allowed elements, edit yml config:
```
	ElementPage:
	  allowed_elements:
	    'ElementContent' : 'Content'
	    'ElementImage' : 'Image'
	    'ElementFile' : 'File'
	    'ElementInternalLink' : 'Internal Link'
	    'ElementExternalLink' : 'External Link'
	    'ElementContact' : 'Contact'
	    'ElementList' : 'Element List'
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

