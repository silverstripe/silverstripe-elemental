<?php
namespace DNADesign\Elemental\GraphQL;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Services\ElementTypeRegistry;
use GraphQL\Type\Definition\Type;
use SilverStripe\Core\Config\Config;
use SilverStripe\GraphQL\FieldDefinition;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\FieldType\DBField;

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
        Config::nest();

        foreach ($this->typeRegistry->getDefinitions() as $class => $config) {
            $fields = $config['graphQL']['types'];
            $typeScaffolder = $scaffolder->type($class);

            foreach ($fields as $name => $cast) {
                // If the name is numeric (ie. associative array) no cast is provided
                if (is_numeric($name)) {
                    $name = $cast;
                    $cast = null;
                }

                // If the cast is not a string then we'll assume no casting is provided.
                if (!is_string($cast)) {
                    $typeScaffolder->addField($name);
                    continue;
                }

                Config::forClass($class)->set('casting', [$name => $cast]);
                $field = singleton($class)->obj($name);

                $typeScaffolder->addField($name, new FieldDefinition(
                    null,
                    $field,
                    function (BaseElement $obj) use ($name) {
                        $field = $obj->obj($name);
                        // return the raw field value, or checks like `is_numeric()` fail
                        if ($field instanceof DBField && $field->isInternalGraphQLType()) {
                            return $field->getValue();
                        }
                        return $field;
                    }
                ));
            }

            $typeScaffolder->operation(SchemaScaffolder::READ_ONE);
            $typeScaffolder->operation(SchemaScaffolder::READ);
        }

        Config::unnest();
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
