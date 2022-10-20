<?php

namespace DNADesign\Elemental\Search;

use SilverStripe\Dev\Deprecation;
use Page;
use SilverStripe\FullTextSearch\Solr\SolrIndex;

if (!class_exists(SolrIndex::class)) {
    return;
}

/**
 * Provides ability to index Elemental content for a page, so it can be returned in the context of the page
 * that the elements belong to
 *
 * @deprecated 4.2.0 Use a custom index instead
 */
class ElementalSolrIndex extends SolrIndex
{
    public function __construct()
    {
        Deprecation::notice('4.2.0', 'Use a custom index instead', Deprecation::SCOPE_CLASS);
    }

    public function init()
    {
        $this->addClass(Page::class);
        $this->addAllFulltextFields();
        /** @see ElementalArea::getElementsForSearch */
        $this->addFulltextField('ElementsForSearch');
    }
}
