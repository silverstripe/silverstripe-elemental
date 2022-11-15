<?php

namespace DNADesign\Elemental\TopPage;

use SilverStripe\Dev\Deprecation;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Dev\State\TestState as BaseState;

/**
 * @deprecated 4.13.0 Will be removed without equivalent functionality to replace it
 */
class TestState implements BaseState
{
    public function __construct()
    {
        Deprecation::withNoReplacement(function () {
            Deprecation::notice('4.13.0', 'Will be removed without equivalent functionality to replace it.');
        });
    }

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
        Deprecation::withNoReplacement(function () {
            /** @var DataExtension $extension */
            $extension = singleton(DataExtension::class);
            $extension->disableTopPageUpdate();
        });
    }
}
