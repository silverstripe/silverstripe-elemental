<?php
namespace DNADesign\Elemental\Services;

use DNADesign\Elemental\Models\BaseElement;
use Psr\SimpleCache\CacheInterface;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Configurable;
use SilverStripe\Core\Flushable;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\Tab;
use SilverStripe\Forms\TabSet;

/**
 * Provides top-level CMS field tab names for any element that extends BaseElement
 *
 * Note that this will be replaced by GraphQL form schema caching (see
 * http://github.com/silverstripe/silverstripe-admin/issues/627 ). This service may be removed without warning in a
 * minor release.
 *
 * @internal
 */
class ElementTabProvider implements Flushable
{
    use Configurable;

    /**
     * Set to true to refresh the tab cache on flush
     *
     * @config
     * @var bool
     */
    private static $regenerate_on_flush = false;

    /**
     * @var CacheInterface
     */
    protected $cache;

    /**
     * Get the top level tab names for the given element class
     *
     * @param string $elementClass
     * @return array Array of the tabs for the element
     */
    public function getTabsForElement($elementClass)
    {
        if (null !== ($tabs = $this->getCache()->get($this->getCacheKey($elementClass)))) {
            return $tabs;
        }

        return $this->generateTabsForElement($elementClass);
    }

    /**
     * This function is triggered early in the request if the "flush" query
     * parameter has been set. Each class that implements Flushable implements
     * this function which looks after it's own specific flushing functionality.
     *
     * @see FlushMiddleware
     */
    public static function flush()
    {
        /** @var static $self */
        $self = singleton(static::class);

        $self->getCache()->clear();

        if ($self->config()->get('regenerate_on_flush')) {
            $self->generateAllTabs();
        }
    }

    /**
     * @param CacheInterface $cache
     * @return $this
     */
    public function setCache($cache)
    {
        $this->cache = $cache;
        return $this;
    }

    /**
     * @return CacheInterface
     */
    protected function getCache()
    {
        return $this->cache;
    }

    /**
     * Identify and regenerate all tab names for all elemental blocks (and cache them)
     *
     * @return void
     */
    protected function generateAllTabs()
    {
        foreach (ClassInfo::subclassesFor(BaseElement::class) as $class) {
            $this->generateTabsForElement($class);
        }
    }

    /**
     * Generate top level tab names for the given element class (and cache them)
     *
     * @param string $elementClass
     * @return array
     */
    protected function generateTabsForElement($elementClass)
    {
        // Create the specified element
        /** @var BaseElement $element */
        $element = Injector::inst()->create($elementClass);

        // Generate CMS fields and grab the "Root" tabset.
        /** @var TabSet $tabset */
        $tabset = $element->getCMSFields()->fieldByName('Root');

        // Get and map the tab names/titles into an associative array
        $tabs = [];
        /** @var Tab $tabDefinition */
        foreach ($tabset->Tabs() as $tabDefinition) {
            $tabs[] = [
                'name' => $tabDefinition->getName(),
                'title' => $tabDefinition->Title(),
            ];
        }

        // Cache them for next time
        $this->getCache()->set($this->getCacheKey($elementClass), $tabs);

        return $tabs;
    }

    /**
     * Generate a valid cache key from the given element class.
     *
     * @param string $className
     * @return string
     */
    protected function getCacheKey($className)
    {
        return 'Tabs.' . str_replace(['\\'], '-', $className ?? '');
    }
}
