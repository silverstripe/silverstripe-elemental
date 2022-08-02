<?php
namespace DNADesign\Elemental\Services;

use DNADesign\Elemental\Models\BaseElement;
use InvalidArgumentException;
use LogicException;
use Psr\SimpleCache\CacheInterface;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\Schema\Exception\SchemaBuilderException;
use stdClass;

class ElementTypeRegistry
{
    use Injectable;

    const CACHE_KEY = 'element-types';

    /**
     * @var array
     */
    protected $elementTypes;

    /**
     * @var CacheInterface
     */
    protected static $cache;

    /**
     * Register an element type with this registry
     *
     * @param string $elementClass
     * @return $this
     * @throws SchemaBuilderException
     */
    public function registerElement($elementClass)
    {
        if ($elementClass === BaseElement::class) {
            $this->registerBrokenElement();
            return $this;
        }

        $singleton = singleton($elementClass);

        if (!$singleton instanceof BaseElement) {
            throw new LogicException('Only elements that extend ' . BaseElement::class . ' can be registered');
        }

        // Get the GraphQL type name
        $typeName = $singleton->getGraphQLTypeName();

        $this->elementTypes[] = [
            'icon' => $singleton::config()->get('icon'),
            'name' => $typeName,
            'class' => $elementClass,
            'title' => $singleton->getType(),
            'inlineEditable' => $singleton->inlineEditable(),
            'editTabs' => $this->getTabProvider()->getTabsForElement($elementClass),
            // Cast to object as React prop-types expects it.
            'config' => (object) $singleton::getBlockConfig(),
            'broken' => false,
        ];

        return $this;
    }

    private function registerBrokenElement()
    {
        $singleton = singleton(BaseElement::class);
        $this->elementTypes[] = [
            'icon' => 'font-icon-block',
            'name' => $singleton->getGraphQLTypeName(),
            'class' => BaseElement::class,
            'title' => '',
            'inlineEditable' => false,
            'editTabs' => [],
            'config' => new stdClass(),
            'broken' => true,
        ];
    }

    /**
     * Get the schema of the element types that are registered
     *
     * @return array
     */
    public function getDefinitions()
    {
        return $this->elementTypes;
    }

    /**
     * Get the element type data for the given instance or class name of an element.
     *
     * @param $instanceOrClass
     * @return mixed
     */
    public function getDefinition($instanceOrClass)
    {
        if ($instanceOrClass instanceof BaseElement) {
            $instanceOrClass = get_class($instanceOrClass);
        }

        if (!is_string($instanceOrClass)) {
            throw new InvalidArgumentException(sprintf(
                'Given argument to %s is not an instance of a class extending %s and is not a string',
                __METHOD__,
                BaseElement::class
            ));
        }

        $definitions = $this->getDefinitions();

        if (!isset($definitions[$instanceOrClass])) {
            throw new InvalidArgumentException(sprintf('Unknown element "%s"', $instanceOrClass));
        }

        return $definitions[$instanceOrClass];
    }

    /**
     * @internal This API is only intended for use while SilverStripe does not have a caching layer for form schema.
     *           See: https://github.com/silverstripe/silverstripe-admin/issues/627
     * @return ElementTabProvider
     */
    protected function getTabProvider()
    {
        // This is a temporary solution until something client side is implemented to reveal tab names.
        return Injector::inst()->get(ElementTabProvider::class);
    }

    /**
     * Create a registry and attempt to fill it by resolving element types by introspecting class hierarchy
     *
     * @return static
     */
    public static function generate()
    {
        $registry = static::create();

        // Look in a cache (if provided) for type details
        if (static::$cache && ($types = static::$cache->get(self::CACHE_KEY))) {
            $registry->elementTypes = $types;
            return $registry;
        }

        // Find all element types
        $classNames = ClassInfo::getValidSubClasses(BaseElement::class);
        foreach ($classNames as $class) {
            $registry->registerElement($class);
        }

        return $registry;
    }
}
