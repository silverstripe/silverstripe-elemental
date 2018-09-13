<?php

namespace DNADesign\Elemental\Tests\Forms;

use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\Dev\SapphireTest;

class EditFormFactoryTest extends SapphireTest
{
    protected static $fixture_file = 'EditFormFactoryTest.yml';

    public function testFormFieldsHaveNamespaces()
    {
        /** @var ElementContent $record */
        $record = $this->objFromFixture(ElementContent::class, 'content_block');

        $factory = new EditFormFactory();
        $result = $factory->getForm(null, 'FooForm', ['Record' => $record]);
        $fields = $result->Fields();

        $this->assertNotNull($fields->dataFieldByName('PageElements_' . $record->ID . '_Title'));
    }
}
