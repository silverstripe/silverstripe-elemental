<?php

namespace DNADesign\Elemental\TopPage;

use SilverStripe\Dev\SapphireTest;
use SilverStripe\Dev\State\TestState as BaseState;

class TestState implements BaseState
{
    public function setUp(SapphireTest $test): void
    {
        $this->disableTopPageUpdate();
    }

    public function tearDown(SapphireTest $test): void
    {
    }

    public function setUpOnce($class): void
    {
        $this->disableTopPageUpdate();
    }

    public function tearDownOnce($class): void
    {
    }

    /**
     * We need to disable top page updates as it doesn't work with fixture builder and transactions in unit tests
     * caused by an attempt to traverse unsaved relations which is normally fine
     * the lookup failure causes the whole transaction to fail which is the whole unit test
     * this has no impact on the functionality, though
     */
    private function disableTopPageUpdate(): void
    {
        /** @var DataExtension $extension */
        $extension = singleton(DataExtension::class);
        $extension->disableTopPageUpdate();
    }
}
