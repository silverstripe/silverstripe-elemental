# Searching Blocks

## Overview

Content created through SilverStripe can be searched in various ways.
A popular option is the [silverstripe/fulltextsearch](https://github.com/silverstripe/silverstripe-fulltextsearch)
module, which integrates with search services such as Solr.

## Usage

You can add elements to your search results by adding them to a
`SolrIndex` you define for your particular context.

It works based on a new `getElementsForSearch` method added to your `Page` class
through the `DNADesign\Elemental\Extensions\ElementalPageExtension`.
This method renders out the full content of all elements,
strips out the HTML, and indexes it as one field. 

```php
<?php

use Page;
use SilverStripe\FullTextSearch\Solr\SolrIndex;

class MySolrIndex extends SolrIndex
{
    public function init()
    {
        $this->addClass(Page::class);
        $this->addAllFulltextFields();
        /** @see ElementalArea::getElementsForSearch */
        $this->addFulltextField('ElementsForSearch');
    }
}
