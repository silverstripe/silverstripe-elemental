<?php

namespace DNADesign\Elemental\TopPage;

use SilverStripe\Dev\SapphireTest;
use SilverStripe\Dev\State\TestState as BaseState;

class TestState implements BaseState
{
    public function setUp(SapphireTest $test): void
    {
    }

    public function tearDown(SapphireTest $test): void
    {
    }

    public function setUpOnce($class): void
    {
    }

    public function tearDownOnce($class): void
    {
    }
}
