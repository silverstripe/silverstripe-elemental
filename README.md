# SilverStripe Elemental

[![Build Status](http://img.shields.io/travis/dnadesign/silverstripe-elemental.svg?style=flat)](https://travis-ci.org/dnadesign/silverstripe-elemental)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/dnadesign/silverstripe-elemental/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/dnadesign/silverstripe-elemental/?branch=master)
[![codecov](https://codecov.io/gh/dnadesign/silverstripe-elemental/branch/master/graph/badge.svg)](https://codecov.io/gh/dnadesign/silverstripe-elemental)
[![SilverStripe supported module](https://img.shields.io/badge/silverstripe-supported-0071C4.svg)](https://www.silverstripe.org/software/addons/silverstripe-commercially-supported-module-list/)
[![Version](http://img.shields.io/packagist/v/dnadesign/silverstripe-elemental.svg?style=flat)](https://packagist.org/packages/dnadesign/silverstripe-elemental)
[![License](http://img.shields.io/packagist/l/dnadesign/silverstripe-elemental.svg?style=flat)](LICENSE.md)

## Introduction

This module extends a page type to swap the content area for a GridField and manageable elements to compose a page out
of rather than a single text field. Features supported:

* Versioning of elements
* Ability to add, remove supported elements per page

The module provides basic markup for each of the elements but you will likely need to provide your own styles. Replace
the `$Content` variable with `$ElementalArea` in your page templates, and rely on the markup of the individual elements.

For a more detailed overview of using this module, please see [the User help guides](docs/en/index.md).

## Requirements

* SilverStripe CMS ^4.2
* Versioned Admin ^1.0
* GridFieldExtensions ^3.1

For a SilverStripe 3.x compatible version of this module, please see the [1 branch, or 1.x release line](https://github.com/dnadesign/silverstripe-elemental/tree/1#readme).

## Installation

```
composer require dnadesign/silverstripe-elemental 3.0.x-dev
```

The following YAML config will enable elements on every `Page` object,
replacing the standard `Content` rich text field.

**mysite/\_config/elements.yml**

```yaml
Page:
  extensions:
    - DNADesign\Elemental\Extensions\ElementalPageExtension
```

In your page type layout template use `$ElementalArea` to render the elements to the page.

## Getting more elements

Note that this module comes by default with the base element and a "Content" element. If you need more, take
a look at some other modules:

## SilverStripe supported content block modules

To learn more about [SilverStripe supported](https://www.silverstripe.org/software/addons/supported-modules-definition/) content block types see, [Creating new blocks](/docs/en/edit_content.md).

* [dnadesign/silverstripe-elemental](https://github.com/dnadesign/silverstripe-elemental): Text content (built-in)
* [silverstripe/silverstripe-elemental-fileblock](https://github.com/silverstripe/silverstripe-elemental-fileblock): File and image block
* [silverstripe/silverstripe-elemental-bannerblock](https://github.com/silverstripe/silverstripe-elemental-bannerblock): Banner with call-to-action and content
* [dnadesign/silverstripe-elemental-userforms](https://github.com/dnadesign/silverstripe-elemental-userforms): Embed a [user defined form](https://github.com/silverstripe/silverstripe-userforms)

## Examples of community built content block modules (not a comprehensive list)

* [dnadesign/silverstripe-elemental-list](https://github.com/dnadesign/silverstripe-elemental-list): Container for elements (allows layouts)
* [dnadesign/silverstripe-elemental-virtual](https://github.com/dnadesign/silverstripe-elemental-virtual): Reuse elements across pages
* [dynamic/silverstripe-elemental-customer-service](https://github.com/dynamic/silverstripe-elemental-customer-service): Contact information
* [dynamic/silverstripe-elemental-accordion](https://github.com/dynamic/silverstripe-elemental-accordion): Expand/collapse content areas
* [dynamic/silverstripe-elemental-flexslider](https://github.com/dynamic/silverstripe-elemental-flexslider): Slideshows with flexible elements
* [dynamic/silverstripe-elemental-blog](https://github.com/dynamic/silverstripe-elemental-blog): Recent blog posts
* [dynamic/silverstripe-elemental-sponsors](https://github.com/dynamic/silverstripe-elemental-sponsors): Sponsor logos
* [dynamic/silverstripe-elemental-testimonials](https://github.com/dynamic/silverstripe-elemental-testimonials): Customer testimonials and quotes
* [nyeholt/silverstripe-ozzymental](https://github.com/nyeholt/silverstripe-ozzymental): oEmbed items (video, etc)
* [dynamic/silverstripe-elemental-countdown](https://github.com/dynamic/silverstripe-elemental-countdown): Countdown to a specific date/time

## Helpful modules

These modules can extend functionality, and make elemental
more compatible with other approaches in SilverStripe:

* [dnadesign/silverstripe-elemental-subsites](https://github.com/dnadesign/silverstripe-elemental-subsites): Compatibility with the [silverstripe/subsites](https://github.com/silverstripe/silverstripe-subsites) module
* [dnadesign/silverstripe-elemental-skeletons](https://github.com/dnadesign/silverstripe-elemental-skeletons): Creates a template of elements which can be created for a page in the CMS

## Configuration

### Limit to specific page type

If you want to use elements alongside traditional page types,
you can define an "empty" page type and assign the extension only to this type.

**mysite/src/MyElementPage.php**

```php
<?php
class MyElementPage extends Page
{    
}
```

**mysite/\_config/elements.yml**

```yaml
MyElementPage:
  extensions:
    - DNADesign\Elemental\Extensions\ElementalPageExtension
```

### Customize HTML and markup

The basic element area is rendered into the `DNADesign/Elemental/Models/ElementalArea.ss` template. This loops over
each of the element controller instances. Each controller instance will render `$ElementHolder` which represents
the element contained within a holder `div`. The wrapper div is the `ElementHolder.ss` template.

### Limit allowed elements

You may wish to only enable certain elements for the CMS authors to choose from rather than the full set. This can be
done according to various page types:

```yaml
Page:
  allowed_elements:
    - DNADesign\Elemental\Models\ElementContent
```

Likewise, you can exclude certain elements from being used.

```yaml
Page:
  disallowed_elements:
    - YourCompany\YourModule\Elements\ElementContact
```

### Sharing elements between pages

By default the page to element relationship is a "has one", meaning you cannot share elements between pages. If this
functionality is desired, you could take a look at the [silverstripe-elemental-virtual](https://github.com/dnadesign/silverstripe-elemental-virtual)
module which helps to achieve this.

### Defining your own elements

An element is as simple as a PHP class which extends `DNADesign\Elemental\Models\BaseElement`, and a template to go
with it (unless you want it to use the default template). After you add the class, ensure you have rebuilt your
database and reload the CMS.

```php
<?php

use DNADesign\Elemental\Models\BaseElement;

class MyElement extends BaseElement
{
    private static $singular_name = 'my element';

    private static $plural_name = 'my elements';

    private static $description = 'What my custom element does';

	public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        // ...

        return $fields;
    }

    public function getType()
    {
        return 'My Element';
    }
}
```

### Defining your own HTML

`MyElement` will be rendered into a `MyElement.ss` template with the `ElementHolder.ss` wrapper. Changing the holder
template can be done via YAML, or by using a `$controller_template` on your subclass.

```php
private static $controller_template = 'MyElementHolder';
```

To customise existing block templates such as `Content` and `Form` templates, copy the relevant files from
`vendor/dnadesign/silverstripe-elemental/templates` to your theme. When doing this, ensure you match the folder
structure (PHP class namespace) to ensure that your new template version takes priority.

**Note:** The default set of elements follow the [BEM (Block Element Modifier])(http://getbem.com/) class naming
convention, which allows developers to style individual parts of the DOM without unnecessarily nested CSS. Where
possible, we encourage you to follow this naming system.

### Style variants

Via YAML you can configure a whitelist of style variants for each `BaseElement` subclass. For instance, if you have
`dark` and `light` variations of your content block you would enter the following in YAML in the format
(class: 'Description'). The class will be added to the `ElementHolder`.

```yml
DNADesign\Elemental\Models\ElementContent:
  styles:
    light: 'Light Background'
    dark: 'Dark Background'
```

### Disabling the default stylesheets

When installing this module, there may be a default set of CSS stylesheets that come to provide some examples for the
various default element types for the front-end website.

You can disable this with YAML configuration:

```yaml
# File: mysite/_config/elements.yml
DNADesign\Elemental\Controllers\ElementController:
  include_default_styles: false
```

### Implementing search

The Elemental module comes with an indexer for Solr (via the
[silverstripe-fulltextsearch module](https://github.com/silverstripe/silverstripe-fulltextsearch)). You can enable
this index in your search engine to ensure that a page's elemental area content is indexed under the page's data.

For information on configuring Solr please see [the fulltextsearch documentation](https://github.com/silverstripe/silverstripe-fulltextsearch).

**Note:** If using this indexer, be aware that HTML tags will be stripped from the content before it is indexed.
The Solr search results may add in emphasis tags or other formatting around matched key words, so you may need
to allow unescaped HTML in your search results template. You should use the `$Excerpt` property (see
`SolrIndex::search` for more) to display the relevant search matches.

## Building the elemental frontend assets

This module uses the [SilverStripe Webpack module](https://github.com/silverstripe/webpack-config), and inherits
things from the core SilverStripe 4 modules, such as a core variable sheet and Javascript components.

When making changes to either the SASS or Javascript files, ensure you change the source files in `client/src/`.

You can have [yarn](https://yarnpkg.com/en/) watch and rebuild delta changes as you make them (for development only):

```
yarn watch
```

When you're ready to make a pull request you can rebuild them, which will also minify everything. Note that `watch`
will generate source map files which you shouldn't commit in for your final pull request. To minify and package:

```
yarn build
```

You'll need to have [yarn installed](https://yarnpkg.com/en/docs/install) globally in your command line.

**Note:** If adding or modifying colours, spacing, font sizes etc. please try and use an appropriate variable from the silverstripe/admin module if available.

## Screenshots

![Elemental content block overview](docs/en/images/content-block-overview.png)

## Versioning

This library follows [Semver](http://semver.org). According to Semver, you will be able to upgrade to any minor or patch version of this library without any breaking changes to the public API. Semver also requires that we clearly define the public API for this library.

All methods, with `public` visibility, are part of the public API. All other methods are not part of the public API. Where possible, we'll try to keep `protected` methods backwards-compatible in minor/patch versions, but if you're overriding methods then please test your work before upgrading.

## Reporting Issues

Please [create an issue](https://github.com/dnadesign/silverstripe-elemental/issues) for any bugs you've found, or features you're missing.

## Credits

CMS Icon blocks by Creative Stall from the Noun Project.
