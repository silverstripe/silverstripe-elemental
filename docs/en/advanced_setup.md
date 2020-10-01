# Elemental - advanced setup

This documentation assumes that the reader is already familiar with basic concepts
of the [Elemental module](https://github.com/dnadesign/silverstripe-elemental) and the [Fluent module](https://github.com/tractorcow-farm/silverstripe-fluent).
This document provides an advanced setup guide for enterprise scale projects using these modules.

Table of Contents:
* [Elemental setup](#elemental-setup)
    * [Page setup](#page-setup)
    * [Block setup](#block-setup)
    * [Adding additional Elemental Areas](#adding-additional-elemental-areas)
        * [Allowing different Block types for different Elemental Areas](#adding-additional-elemental-areas)
* [Elemental with Fluent setup](#elemental-with-fluent-setup)
	* [Types of localisation](#types-of-localisation)
		* [Benefits of indirect localisation](#benefits-of-indirect-localisation)
		* [Downsides of indirect localisation](#downsides-of-indirect-localisation)
	* [Unit tests](#unit-tests)
		* [Make sure your fixture has some locales setup](#make-sure-your-fixture-has-some-locales-setup)
		* [Localised fixture data (automatic, single locale)](#localised-fixture-data-automatic-single-locale)
		* [Localised fixture data (manual, single or multiple locales)](#localised-fixture-data-manual-single-or-multiple-locales)
	* [Working with Fluent state](#working-with-fluent-state)
* [Top Page reference performance enhancement](#top-page-reference-performance-enhancement)

## Elemental setup

### Page setup

It's a good idea to create a `BlockPage` class to represent a page with blocks (i.e. avoid adding blocks directly to the `Page`).
This allows more flexibility as other page types can subclass `Page` without inheriting any blocks related functionality.
This is useful for covering edge cases that may appear during projects (i.e. not all pages may need blocks).

```php
class BlockPage extends Page
{
    /**
     * @var array
     */
    private static $extensions = [
        ElementalPageExtension::class,
    ];

    // ...
}
```

### Block setup

It is possible to share blocks between pages, but this may be a little bit tricky when it comes to content editing.
Block should represent a chunk of page content, so editing it should not effect other pages.
This depends on the project, but in most cases the content authors will be working per page (top down),
so sharing blocks is probably something to avoid.
Shared blocks become even less useful when large number of block instances are present as it becomes almost impossible
to find the right one.

The overall recommendation is to only allow a content block to be used on only one page.
The main benefit of using blocks is to reuse patterns and functionality across pages, not necessarily content data.
It's possible to add functionality which allows content authors to copy specific blocks to other pages for a quick
transfer of content data.

Elemental editor `GridField` needs to be adjusted accordingly:

```php
/**
 * Apply strong inheritance relation config
 * no existing auto complete as reusing items is not allowed
 * no unlink button for the same reason
 *
 * @param GridFieldConfig $config
 * @return GridFieldConfig
 */
public static function strongInheritanceConfig(GridFieldConfig $config): GridFieldConfig
{
    $config->removeComponentsByType([
        // remove add existing button since this is a full ownership relation
        GridFieldAddExistingAutocompleter::class,
        // remove archive action because nested objects are expected to be publish / un-publish via page
        GridFieldArchiveAction::class,
    ]);

    /** @var GridFieldDeleteAction $deleteAction */
    $deleteAction = $config->getComponentByType(GridFieldDeleteAction::class);

    if ($deleteAction !== null) {
        // replace unlink relation button with delete button since this is a full ownership relation
        $deleteAction->setRemoveRelation(false);
    }

    return $config;
}
```

Note that we also want to remove `publish` and `archive` actions from blocks.
These actions will be done only on page level and will cascade down to blocks.
Make sure to properly configure your objects with the `owns` and `cascade_deletes`.

### Adding additional Elemental Areas

To keep things simple, we'll assume that you already have one Elemental Area available from applying the default
`ElementalPageExtension` to your page. This extension is important, as it contains a bunch of required functionality to
support us adding additional Elemental Areas.

Consider the following default page set up.

```php
class BlockPage extends Page
{
    private static $extensions = [
        ElementalPageExtension::class,
    ];

    // ...
}
```

In order to add additional Elemental Areas to the page, we can add three very important configurations.

```php
class BlockPage extends Page
{
    private static $extensions = [
        ElementalPageExtension::class,
    ];

    // Add the model relationship
    private static $has_one = [
        'SidebarElementalArea' => ElementalArea::class,
    ];

    // Make sure that our page owns that relationship (publishing the page also publishes the Elemental Area and Blocks)
    private static $owns = [
        'SidebarElementalArea',
    ];

    // When we duplicate the page, we also want to duplicate the Elemental Area and Blocks
    private static $cascade_duplicates = [
        'SidebarElementalArea',
    ];

    // ...
}
```

And that's actually all you need to get started with multiple Elemental Areas.

#### Allowing different Block types for different Elemental Areas

To restrict different Elemental Areas to different Block types, you need to (manually) manipulate the `types` allowed
for the Gridfield.

```php
class BlockPage extends Page
{
    // ...

    private static $allowed_sidebar_types = [
        ElementContent::class,
    ];

    public function getCMSFields(): FieldList
    {
        $fields = parent::getCMSFields();

        /** @var ElementalAreaField $sidebar */
        $sidebar = $fields->dataFieldByName('SidebarElementalArea');

        if ($sidebar) {
            $sidebar->setTypes(static::config()->get('allowed_sidebar_types'));
        }

        return $fields;
    }
}
```

## Elemental with Fluent setup

`Fluent` module provides multiple options how to localise your content, but there is one option which is the best on average: `indirect localisation`.
The only thing that will be localised directly is the `ElementalArea`relation.

```php
class BlockPage extends Page
{
    /**
     * @var array
     */
    private static $field_include = [
        'ElementalAreaID',
    ];

    // ...
}
```

This configuration allows us to have different `ElementalArea` for different locales of the page.
We also need to create a copy of the `ElementalArea` when content is being localised.

```php
class BlockPage extends Page
{
    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if (!$this->isDraftedInLocale() && $this->isInDB()) {
            $elementalArea = $this->ElementalArea();

            $elementalAreaNew = $elementalArea->duplicate();
            $this->ElementalAreaID = $elementalAreaNew->ID;
        }

        return;
    }

    // ...
}
```

Note that it's important to have the [cascade_duplicates setting](https://docs.silverstripe.org/en/4/developer_guides/model/relations/#cascading-duplications) present on all the relevant objects so they would copy as well.

Furthermore, we also need to disable the inheritance for blocks.
The Fluent module provides multiple extension points, one of them being the `updateLocaliseSelect`.
We need to create an `Extension` with the following code and apply it to the `BlockPage`:

```php
class BlockPageFluentExtension extends Extension
{
    /**
     * Override default Fluent fallback
     *
     * @param string $query
     * @param string $table
     * @param string $field
     * @param Locale $locale
     */
    public function updateLocaliseSelect(&$query, $table, $field, Locale $locale)
    {
        // disallow elemental data inheritance in the case that published localised page instance already exists
        if ($field == 'ElementalAreaID' && $this->owner->isPublishedInLocale()) {
            $query = '"' . $table . '_Localised_' . $locale->getLocale() . '"."' . $field . '"';
        }
    }
}
```


```php
class BlockPage extends Page
{
    /**
     * @var array
     */
    private static $extensions = [
        ElementalPageExtension::class,
        BlockPageFluentExtension::class,
    ];

    // ...
}
```

### Types of localisation

#### Benefits of indirect localisation

* different localisation of pages can have completely different set of blocks which allows greater flexibility
* localisation is only on page level, so any functionality on block level does not need to care about localisation
* this is especially useful when writing unit tests as it is significantly easier to set up tests without localisation

#### Downsides of indirect localisation

* the blocks are unaware of their locales which makes bottom up relation lookup slower
* this can be remedied by some extra data stored in blocks (see notes below)

### Unit tests

Writing unit tests for `Elemental` with `Fluent` can be rather tricky to figure out.
Here are some guidelines to make that easier.

#### Make sure your fixture has some locales setup

It's important to include some locales because otherwise your test might be testing a very different situation.
Example `Locale` setup in a fixture:

```yml
TractorCow\Fluent\Model\Locale:
  nz:
    Locale: en_NZ
    Title: 'English (New Zealand)'
    URLSegment: newzealand
  us:
    Locale: en_US
    Title: 'English (US)'
    URLSegment: usa
    Fallbacks:
      - =>TractorCow\Fluent\Model\Locale.nz
```

#### Localised fixture data (automatic, single locale)

In the case your fixture needs to contain data for only a single locale you can specify your desired locale in your unit test like this:

```php
protected function setUp()
{
    // Set locale for fixture creation
    FluentState::singleton()->withState(function (FluentState $state) {
        $state->setLocale('en_NZ');
        parent::setUp();
    });
}

```

This will localise all your data so you don't need to worry about that in your fixtures. The following fixture will produce a page localised in `en_NZ`:

```yml
App\Pages\OperatorArticlePage:
  article-page1:
    Title: ArticlePage1 NZ
    URLSegment: article-page1
```

#### Localised fixture data (manual, single or multiple locales)

In some cases you want to have multiple locales of one page set up in your fixtures.
This means you need to specify localised data manually.
Example below shows how to specify localised `Title` for two locales of one page.
Note that each localised field has to be specified for the table that actually holds the field.
In this case, it's `SiteTree`.
If you are unsure where your field sits it may be a good idea to check your database structure first and find the relevant table.

```yml
App\Pages\OperatorArticlePage:
  article-page1:
    Title: ArticlePage1
    URLSegment: article-page1

SiteTree_Localised:
  article-page1-nz:
    Locale: en_NZ
    RecordID: =>App\Pages\OperatorArticlePage.article-page1
    Title: ArticlePage1 NZ
  article-page1-au:
    Locale: en_AU
    RecordID: =>App\Pages\OperatorArticlePage.article-page1
    Title: ArticlePage1 AU
```

### Working with Fluent state

Make sure you always use the `FluentState` callback to change the global state like this:

```php
FluentState::singleton()->withState(function (FluentState $state) {
    $state->setLocale('en_NZ');

    // your code goes here
});
```

This is very important as global state is reverted back after the callback is executed so it's safe to be used.
Unit tests benefit mostly from this as this makes sure that there are no dependencies between unit tests as the global state is always changed only locally in one test.

## Top Page reference performance enhancement

In some cases your project setup may have deeply nested blocks, for example:

```
Page
  ElementalArea
    RowBlock (represents grid row on frontend)
     ElementalArea
       AccordionBlock (block which can contain other content blocks)
         ElementalArea
           ContentBlock
```

It's quite common to use top page lookups from block context, i.e. a block is querying data from the page that the block
belongs to.

When blocks are owned by a single ElementArea (and therefore a single Page), we can store a reference to the page
directly on the block as a performance enhancement for this query. A set of extensions to manage this are provided out
of the box, and can be enabled by applying the following configuration:

```
DNADesign\Elemental\Models\BaseElement:
  extensions:
    topPageDataExtension: DNADesign\Elemental\TopPage\DataExtension

DNADesign\Elemental\Models\ElementalArea:
  extensions:
    topPageDataExtension: DNADesign\Elemental\TopPage\DataExtension

Page:
  extensions:
    topPageSiteTreeExtension: DNADesign\Elemental\TopPage\SiteTreeExtension
```

These extensions will be enabled by default in Elemental 5.

If your project makes use of the Fluent module, it is recommended to use the following extensions in place of the ones
above:

```
DNADesign\Elemental\Models\BaseElement:
  extensions:
    topPageDataExtension: DNADesign\Elemental\TopPage\FluentExtension

DNADesign\Elemental\Models\ElementalArea:
  extensions:
    topPageDataExtension: DNADesign\Elemental\TopPage\FluentExtension
```

These variants will also store the locale of the top page on blocks, which simplifies top page lookup in case the locale
is unknown at the time of page lookup from block context.

The page reference on the blocks can also be useful for maintenance dev tasks, as it's easy to identify which blocks
belong to which pages in which locale.
