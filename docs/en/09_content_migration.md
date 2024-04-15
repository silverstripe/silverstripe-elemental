---
title: Migrating content from pages
---

# Migrating content from pages

After installing elemental and applying it to certain page types - the standard content editor is replaced by a block
editor. This means existing content is lost. The [`MigrateContentToElement`](api:DNADesign\Elemental\Tasks\MigrateContentToElement) task is provided that will migrate existing
content for you. It will:

- Identify pages that have [`ElementalPageExtension`](api:DNADesign\Elemental\Extensions\ElementalPageExtension)
- Filter out any that have empty content
- Create a content block ([`ElementContent`](api:DNADesign\Elemental\Models\ElementContent)) and set the content to the existing page content
- Clear the existing page content
- Save and publish the page and the block if the latest page version was previously published

There are several configuration options and extension hooks to allow customising the functionality of this class.

## Choosing not to replace the standard content editor

If you wish to apply elemental to pages but still retain the default `Content` field, use the config setting

```yml
DNADesign\Elemental\Extensions\ElementalAreasExtension:
  keep_content_fields: true
```

**Note** This setting is globally applied. If you wish to replace the default Content area for all but a few
select page types, you can instead add a config option to that class

```yml
YourVendor\YourProject\Pages\SpecialBlockAndContentPage:
  elemental_keep_content_field: true
```

The owner class config setting will always take precedence over the global setting (on the extension).
This makes it possible to e.g. keep content fields globally, except for select page types.

## Configuring the element that is created

You may configure which element content is migrated to by using the following configuration:

```yml
DNADesign\Elemental\Tasks\MigrateContentToElement:
  target_element: My\App\Blocks\MyBlock
  target_element_field: Content
```

`target_element` specifies the element that will be created and `target_element_field` specifies the data field that
will be populated with the content from the page. Additionally you can use the `updateMigratedElement` extension point
to further modify the element using the existing content and page.

## Disabling auto publish

You may disable the "auto-publish" functionality of this task with config

```yml
DNADesign\Elemental\Tasks\MigrateContentToElement:
  publish_changes: false
```

## Keeping the content on the page

In some cases you may wish to keep the existing content stored on the `Content` field on pages. Removing it is optional
and can be turned off with config:

```yml
DNADesign\Elemental\Tasks\MigrateContentToElement:
  clear_content: false
```

With this setting enabled the task can no longer filter out pages that have already been migrated by checking if the
existing content is empty. Instead the task will not migrate pages that have at least one block already while this
configuration option is enabled.

## Working without the `ElementalPageExtension`

While this task is built for pages that use the `ElementalPageExtension` it is possible to use elemental using only the
`ElementalAreaExtension`. In this case you can extend this task and overload the `isMigratable` and
`getAreaRelationFromPage` methods to support your use-case.
