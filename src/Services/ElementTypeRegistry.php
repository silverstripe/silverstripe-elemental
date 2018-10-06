<?php
namespace DNADesign\Elemental\Services;

use DNADesign\Elemental\Models\BaseElement;
use InvalidArgumentException;
use LogicException;
use Psr\SimpleCache\CacheInterface;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\Manager;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\GraphQL\Scaffolding\StaticSchema;

class ElementTypeRegistry
{
    use Injectable;

    const CACHE_KEY = 'element-types';

    /**
     * @var array
     */
    protected static $elementTypes;

    /**
     * @var CacheInterface
     */
    protected static $cache;

    /**
     * ElementTypeRegistry constructor.
     */
    public function __construct()
    {
        $this->generateRegistry();
    }

    public function registerElement($elementClass)
    {
        $singleton = singleton($elementClass);

        if (!$singleton instanceof BaseElement) {
            throw new LogicException('Only elements that extend ' . BaseElement::class . ' can be registered');
        }

        // Set the ID to something that can be replaced
        $singleton->ID = ':ID';

        $graphQLType = StaticSchema::inst()->typeNameForDataObject($elementClass);

        static::$elementTypes[$elementClass] = [
            'graphQL' => [
                'type' => $graphQLType,
                'fields' => $singleton->getGraphQLDefinitions(),
            ],
            'properties' => [
                'icon' => $singleton::config()->get('icon'),
                'type' => $singleton->getType(),
                'inlineEditable' => $singleton->inlineEditable(),
                'editTabs' => $this->getTabProvider()->getTabsForElement($elementClass)
            ],
        ];
    }

    public function getDefinitions()
    {
        return static::$elementTypes;
    }

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
     * @return ElementTabProvider
     */
    protected function getTabProvider()
    {
        // This is a temporary solution until something client side is implemented to reveal tab names.
        return Injector::inst()->get(ElementTabProvider::class);
    }

    protected function generateRegistry()
    {
        if (is_array(static::$elementTypes)) {
            return;
        }

        // Look in a cache (if provided) for type details
        if (static::$cache && ($types = static::$cache->get(self::CACHE_KEY))) {
            static::$elementTypes = $types;
            return;
        }

        // Find all element types
        $classNames = ClassInfo::getValidSubClasses(BaseElement::class);
        foreach ($classNames as $class) {
            if ($class === BaseElement::class) {
                continue;
            }
            $this->registerElement($class);
        }
    }
}
