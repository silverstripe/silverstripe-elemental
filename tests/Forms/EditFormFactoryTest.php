<?php

namespace DNADesign\Elemental\Tests\Forms;

use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextField;

class EditFormFactoryTest extends SapphireTest
{
    protected static $fixture_file = 'EditFormFactoryTest.yml';

    public function testFormFieldsHaveNamespaces()
    {
        $record = $this->objFromFixture(ElementContent::class, 'content_block');

        $factory = new EditFormFactory();
        $result = $factory->getForm(null, 'FooForm', ['Record' => $record]);
        $fields = $result->Fields();

        $this->assertNotNull($fields->dataFieldByName('PageElements_' . $record->ID . '_Title'));
    }

    public function testNamespaceFields(): void
    {
        $record = $this->objFromFixture(ElementContent::class, 'content_block');
        $factory = new EditFormFactory();
        $fields = new FieldList([
            new TextField('FieldOne'),
            new LiteralField('IgnoredField', ''),
            new UploadField('FieldTwo'),
        ]);
        $factory->namespaceFields($fields, ['Record' => $record]);

        $expectedNames = [
            'PageElements_' . $record->ID . '_FieldOne',
            'IgnoredField',
            'PageElements_' . $record->ID . '_FieldTwo',
        ];
        $this->assertSame($expectedNames, $fields->column('Name'));
    }

    public function testRemoveNamespaceFromFields(): void
    {
        $record = $this->objFromFixture(ElementContent::class, 'content_block');
        $factory = new EditFormFactory();
        $fields = new FieldList([
            new TextField('PageElements_' . $record->ID . '_FieldOne'),
            new LiteralField('IgnoredField', ''),
            new UploadField('PageElements_' . $record->ID . '_FieldTwo'),
        ]);
        $factory->removeNamespaceFromFields($fields, ['Record' => $record]);

        $expectedNames = [
            'FieldOne',
            'IgnoredField',
            'FieldTwo',
        ];
        $this->assertSame($expectedNames, $fields->column('Name'));
    }
}
