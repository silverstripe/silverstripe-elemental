<?php

namespace DNADesign\Elemental\Tests\Forms;

use DNADesign\Elemental\Forms\ElementalGridFieldAddNewMultiClass;
use SilverStripe\Dev\SapphireTest;

class ElementalGridFieldAddNewMultiClassTest extends SapphireTest
{
    public function testBlockTypeIsUsedForTitle()
    {
        $component = new ElementalGridFieldAddNewMultiClass;

        $result = $component->applyBlockTypeTitles([
            'DNADesign-Elemental-Models-ElementContent' => 'content block'
        ]);

        $this->assertSame('Content', $result['DNADesign-Elemental-Models-ElementContent']);
    }
}
