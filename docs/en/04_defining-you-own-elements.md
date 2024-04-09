---
title: Defining your own elements
---

# Defining your own elements

An element is as simple as a PHP class which extends [`BaseElement`](api:DNADesign\Elemental\Models\BaseElement), and a template to go
with it (unless you want it to use the default template). After you add the class, ensure you have rebuilt your
database and reload the CMS.

The `getSummary()` method will be used to provide a short summary to content authors of what data is in the element.

```php
// app/src/Elements/MyElement.php
namespace App\Elements;

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

    public function getSummary(): string
    {
        return 'String that represents element';
    }

    public function getType()
    {
        return 'My Element';
    }
}
```

## In-line editing

Elements can be edited in the CMS using an inline form where all your elements appear together. For elements
that are more complex (e.g. use custom `FormField` classes) you can disable the in-line edit form by setting `private static $inline_editable = false` in your
element class. A [`GridFieldDetailForm`](api:SilverStripe\Forms\GridField\GridFieldDetailForm) will be used to edit blocks that are not in-line editable. Alternatively as the CMS element editor is now React driven, in-line editing functionality can be added to by defining your own React components.

> [!NOTE]
> The default is that all elements are in-line editable

If in-line editing is not disabled, whilst not having a custom component defined, custom fields will not be rendered unless the field's `schemaDataType` is set with [`FormField::getSchemaDataType()`](api:SilverStripe\Forms\FormField::getSchemaDataType()).

After building your own React components and including them into the CMS, altering the applicable Element's PHP definition to use the new React component can be achieved by setting some `protected` properties of that class.

```php
namespace SilverStripe\ElementalBannerBlock\Form;

use SilverStripe\Forms\FormField;

class BlockLinkField extends FormField
{
    // ...
    protected $schemaDataType = FormField::SCHEMA_DATA_TYPE_CUSTOM;

    protected $schemaComponent = 'BlockLinkField';
}
```

> [!NOTE]
>
> - The `$schemaDataType` does not need to be CUSTOM, but should not be STRUCTURAL as structural types are not submitted as form data.
> - The `$schemaComponent` is the name of the React component you have created to be used.

The above example was taken from [`silverstripe/elemental-bannerblock`](https://github.com/silverstripe/silverstripe-elemental-bannerblock/blob/3/src/Block/BannerBlock.php)

## Defining your own HTML

`MyElement` will be rendered into a `MyElement.ss` template with the `ElementHolder.ss` wrapper. Changing the holder
template can be done via YAML, or by using a `$controller_template` on your subclass.

```php
// app/src/Elements/MyElement.php
namespace App\Elements;

use DNADesign\Elemental\Models\BaseElement;

class MyElement extends BaseElement
{
    // ...
    private static $controller_template = 'MyElementHolder';
}
```

To customise existing block templates such as `Content` and `Form` templates, copy the relevant files from
`vendor/dnadesign/silverstripe-elemental/templates` to your theme. When doing this, ensure you match the folder
structure (PHP class namespace) to ensure that your new template version takes priority.

> [!NOTE]
> The default set of elements follow the [BEM (Block Element Modifier)](https://getbem.com/) class naming
> convention, which allows developers to style individual parts of the DOM without unnecessarily nested CSS.
> Where possible, we encourage you to follow this naming system.

## Position helpers

In your `BaseElement` template you can use the following variables for additional
logic or styling helpers. They behave in the same way traditional `SS_Viewer`
methods work either returning a `Boolean`, `String` or a `Int`

  1. `$First` (boolean)
  1. `$Last` (boolean)
  1. `$Pos` (int)
  1. `$TotalItems` (int)
  1. `$EvenOdd` (string - 'even' or 'odd')

```html
<div class="element element--{$EvenOdd} <% if First %>element--first<% end_if %> <% if Last %>element--last<% end_if %>">
    // ...
</div>
```

## Style variants

Via YAML you can configure a whitelist of style variants for each `BaseElement`
subclass. For instance, if you have `dark` and `light` variations of your
content block you would enter the following in YAML in the format
(class: 'Description'). The class will be added to the `ElementHolder`.

```yml
DNADesign\Elemental\Models\ElementContent:
  styles:
    light: 'Light Background'
    dark: 'Dark Background'
```

## Disabling the default stylesheets

When installing this module, there may be a default set of CSS stylesheets that come to provide some examples for the
various default element types for the front-end website.

You can disable this with YAML configuration:

```yml
# app/_config/elements.yml
DNADesign\Elemental\Controllers\ElementController:
  include_default_styles: false
```

## Usage of gridField

This module used to use GridField to create and update Elements in the CMS. This has now been largely succeeded by a JavaScript interface via React. However elements that are marked as being incompatible with in-line editing will still use the GridField method.
