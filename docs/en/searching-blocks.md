# Searching Blocks

## Overview

Content created through SilverStripe can be searched in various ways.
A popular option is the [silverstripe/fulltextsearch](https://github.com/silverstripe/silverstripe-fulltextsearch)
module, which integrates with search services such as Solr.

## Usage

When you install the fulltextsearch module, it will auto-discover
an index provided by elemental: 
`DNADesign\Elemental\Search\ElementalSolrIndex`.

It works based on a new `getElementsForSearch` method added to your `Page` class
through the `DNADesign\Elemental\Extensions\ElementalPageExtension`.
This method renders out the full content of all elements,
strips out the HTML, and indexes it as one field.

## Configuration

In many cases, you'll already have configured your own search index.
Since the `ElementalSolrIndex` is auto-discovered, it duplicates
search indexing effort even when it is unused.

You can disable it via YAML config in favour of your own index definition:

```yml
SilverStripe\FullTextSearch\Search\FullTextSearch:
  indexes:
    - MyCustomIndex
```