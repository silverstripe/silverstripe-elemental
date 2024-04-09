---
title: Searching blocks
---

# Searching blocks

## Overview

Content created through Silverstripe CMS can be searched in various ways.
A popular option is the [silverstripe/fulltextsearch](https://github.com/silverstripe/silverstripe-fulltextsearch)
module, which integrates with search services such as Solr.

For information on configuring Solr please see [the fulltextsearch documentation](https://github.com/silverstripe/silverstripe-fulltextsearch).

> [!NOTE]
> If using this indexer, be aware that HTML tags will be stripped from the content before it is indexed.
> The Solr search results may add in emphasis tags or other formatting around matched key words, so you may need
> to allow unescaped HTML in your search results template. You should use the `$Excerpt` property (see
> `SolrIndex::search` for more) to display the relevant search matches.

## Usage

You can add elements to your search results by adding them to the
appropriate index for the solution you've chosen.

Elemental content which is ready for indexing is available through the
`getElementsForSearch` method added to your `Page` class
through the `DNADesign\Elemental\Extensions\ElementalPageExtension`.
This method renders out the full content of all elements,
strips out the HTML, and indexes it as one field.

You can define whether each block is included in your search index using the
`search_indexable` configuration variable on the block, which is `true` by default:

```yml
App\Models\MyCustomElementalBlock:
  search_indexable: false
```

You can also customise the content that is indexed for your blocks. By default
the block is rendered in full using the templating engine, and the resultant
markup is included in the index. You can override the `getContentForSearchIndex`
method on your elemental blocks to change that. This is useful, for example, if
your templates include hardcoded text or references to other content you don't
want to be indexed.

If you want to use a specific delimiter between each block, that can be configured
as well. The default is a space, but you might for example want to use an ellipses
to make it clear in search results where one piece of content ends and another begins.

```yml
Page:
  search_index_element_delimiter: ' ... '
```

## CMS page search

CMS page search will include search results for pages with elements that match the search query.

By default it uses the same method as the search indexing where it will fully render every element that is
being searched. This is an expensive operation and can cause performance issues if you have a large site with a lot of elements.

To increase performance by a large amount, likely more than doubling it, you can disable the rendering of elements and instead just look at the database values of the elements directly.

```yml
DNADesign\Elemental\Controllers\ElementSiteTreeFilterSearch:
  render_elements: false
```

If `render_elements` is `false`, then all fields that have stored as a Varchar or Text like are searched. Individual fields on blocks can be excluded from the search by adding fields to the `exclude_fields_from_cms_search` array config variable on the element class. e.g.

```yml
App\MyElement:
  fields_excluded_from_cms_search:
    - MyFieldToExclude
    - AnotherFieldToExclude
```

If the above is still not performant enough, searching elements for content in CMS page search can be disabled entirely:

```yml
DNADesign\Elemental\Controllers\ElementSiteTreeFilterSearch:
  search_for_term_in_content: false
```
