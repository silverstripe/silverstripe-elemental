# Searching Blocks

## Overview

Content created through SilverStripe can be searched in various ways.
A popular option is the [silverstripe/fulltextsearch](https://github.com/silverstripe/silverstripe-fulltextsearch)
module, which integrates with search services such as Solr.

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
