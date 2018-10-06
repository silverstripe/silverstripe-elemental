<?php
namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Services\ElementTypeRegistry;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;

class ElementScaffoldingProvider implements ScaffoldingProvider
{
    /**
     * @var ElementTypeRegistry
     */
    protected $typeRegistry;

    /**
     * @param SchemaScaffolder $scaffolder
     */
    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        foreach ($this->typeRegistry->getDefinitions() as $class => $config) {
            $scaffolder
                ->type($class)
                ->addFields($config['graphQL']['fields'])
                ->operation(SchemaScaffolder::READ_ONE)
                ->end()
                ->operation(SchemaScaffolder::READ)
                ->end();
        }
    }

    /**
     * @return ElementTypeRegistry
     */
    public function getTypeRegistry()
    {
        return $this->typeRegistry;
    }

    /**
     * @param ElementTypeRegistry $typeRegistry
     * @return $this
     */
    public function setTypeRegistry($typeRegistry)
    {
        $this->typeRegistry = $typeRegistry;
        return $this;
    }
}
