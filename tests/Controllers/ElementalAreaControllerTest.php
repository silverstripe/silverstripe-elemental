<?php

namespace DNADesign\Elemental\Tests\Controllers;

use SilverStripe\Dev\FunctionalTest;
use SilverStripe\Security\SecurityToken;
use DNADesign\Elemental\Tests\Blocks\TestElementContent;
use DNADesign\Elemental\Tests\Blocks\TestElementalArea;
use Exception;
use PHPUnit\Framework\Attributes\DataProvider;

class ElementalAreaControllerTest extends FunctionalTest
{
    protected static $fixture_file = 'ElementalAreaControllerTest.yml';
    
    protected static $extra_dataobjects = [
        TestElementContent::class,
        TestElementalArea::class,
    ];

    private $securityTokenWasEnabled = false;

    protected function setUp(): void
    {
        parent::setUp();
        $this->logInWithPermission('ADMIN');
        // CSRF token check is normally disabled for unit-tests
        $this->securityTokenWasEnabled = SecurityToken::is_enabled();
        if (!$this->securityTokenWasEnabled) {
            SecurityToken::enable();
        }
        TestElementContent::$fail = '';
        TestElementalArea::$fail = '';
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        if (!$this->securityTokenWasEnabled) {
            SecurityToken::disable();
        }
    }

    public static function provideElementFormGetSchema(): array
    {
        // There specifically isn't an 'invalid / missing' record test here with $idType, as existing behaviour
        // is to return a 200 with a basically empty schema response.
        // This should be changed to return a 404 in a future major version
        return [
            'Valid existing record' => [
                'fail' => '',
                'expectedCode' => 200,
            ],
            'Reject fail canView() check' => [
                'fail' => 'can-view',
                'expectedCode' => 403,
            ],
        ];
    }

    #[DataProvider('provideElementFormGetSchema')]
    public function testElementFormGetSchema(
        string $fail,
        int $expectedCode,
    ): void {
        TestElementContent::$fail = $fail;
        $element = $this->objFromFixture(TestElementContent::class, 'TestElementContent01');
        $id = $element->ID;
        $url = "/admin/elemental-area/schema/elementForm/$id";
        $headers = $this->getFormSchemaHeader();
        $response = $this->get($url, null, $headers);
        $this->assertSame('application/json', $response->getHeader('Content-type'));
        $this->assertSame($expectedCode, $response->getStatusCode());
        if ($expectedCode !== 200) {
            return;
        }
        $formSchema = json_decode($response->getBody(), true);
        $this->assertSame("admin/elemental-area/schema/elementForm/$id", $formSchema['id']);
        $this->assertSame("admin/elemental-area/elementForm/$id", $formSchema['schema']['action']);
        // schema is nested and retains 'Root' and 'Main' tab hierarchy
        $this->assertSame('Title', $formSchema['schema']['fields'][0]['children'][0]['children'][0]['name']);
        $elementFormID = $formSchema['schema']['fields'][0]['children'][0]['children'][0]['id'];
        $this->assertSame('Form_ElementForm_' . $id . '_Title', $elementFormID);
        $this->assertSame('action_save', $formSchema['schema']['actions'][0]['name']);
        // state node is flattened, unlike schema node
        $this->assertSame('PageElements_' . $id. '_Title', $formSchema['state']['fields'][3]['name']);
        $this->assertSame('TestElementContent01 Title', $formSchema['state']['fields'][3]['value']);
        $this->assertFalse(array_key_exists('errors', $formSchema));
    }

    public static function provideElementFormPost(): array
    {
        return [
            'Valid update existing record' => [
                'idType' => 'existing',
                'dataType' => 'valid',
                'fail' => '',
                'expectedCode' => 200,
            ],
            'Invalid validate()' => [
                'idType' => 'existing',
                'dataType' => 'valid',
                'fail' => 'validate',
                'expectedCode' => 200,
            ],
            'Invalid getCMSCompositeValidator()' => [
                'idType' => 'existing',
                'dataType' => 'valid',
                'fail' => 'cms-composite-validator',
                'expectedCode' => 200,
            ],
            'Reject non-numeric ID in url' => [
                'idType' => 'non-numeric',
                'dataType' => 'valid',
                'fail' => '',
                'expectedCode' => 404,
            ],
            'Reject missing ID in url' => [
                'idType' => 'missing',
                'dataType' => 'valid',
                'fail' => '',
                'expectedCode' => 404,
            ],
            'Reject empty data' => [
                'idType' => 'existing',
                'dataType' => 'empty',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject data containing ID' => [
                'idType' => 'existing',
                'dataType' => 'contains-id',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject fail csrf-token' => [
                'idType' => 'existing',
                'dataType' => 'valid',
                'fail' => 'csrf-token',
                'expectedCode' => 400,
            ],
            'Reject fail canEdit() check' => [
                'idType' => 'existing',
                'dataType' => 'valid',
                'fail' => 'can-edit',
                'expectedCode' => 403,
            ],
        ];
    }

    #[DataProvider('provideElementFormPost')]
    public function testElementFormPost(string $idType, string $dataType, string $fail, int $expectedCode): void
    {
        TestElementContent::$fail = $fail;
        $element = $this->objFromFixture(TestElementContent::class, 'TestElementContent01');
        $id = $element->ID;
        if ($idType === 'non-numeric') {
            $id = 'fish';
        }
        $url = "/admin/elemental-area/elementForm/$id";
        if ($idType === 'missing') {
            $url = str_replace("/$id", '', $url);
        }
        $data = $element->toMap();
        $data['PageElements_' . $element->ID . '_Title'] = 'Updated title';
        unset($data['ID']);
        if ($dataType === 'contains-id') {
            $differentElementID = TestElementContent::create()->write();
            $data['ID'] = $differentElementID;
        } elseif ($dataType === 'empty') {
            $data = [];
        }
        if ($fail) {
            $data['Fail'] = $fail;
        }
        $headers = $this->getFormSchemaHeader();
        if ($fail !== 'csrf-token') {
            $headers = array_merge($headers, $this->getCsrfTokenheader());
        }
        $response = $this->post($url, $data, $headers);
        $this->assertSame($expectedCode, $response->getStatusCode());
        if ($fail === 'csrf-token') {
            // Will end up at an HTML page with "Silverstripe - Bad Request"
            $this->assertSame('text/html; charset=utf-8', $response->getHeader('Content-type'));
            $this->assertStringContainsString('Silverstripe - Bad Request', $response->getBody());
            return;
        }
        $this->assertSame($expectedCode, $response->getStatusCode());
        $this->assertSame('application/json', $response->getHeader('Content-type'));
        if ($expectedCode !== 200) {
            return;
        }
        $formSchema = json_decode($response->getBody(), true);
        if ($fail) {
            // this will be a validation failure
            $this->assertSame("admin/elemental-area/schema/elemental-area/$id", $formSchema['id']);
        } else {
            $expectedUrl = "admin/elemental-area/elementForm/$id";
            $this->assertSame($expectedUrl, $formSchema['id']);
        }
        // schema is nested and retains 'Root' and 'Main' tab hierarchy
        $this->assertSame('Title', $formSchema['schema']['fields'][0]['children'][0]['children'][0]['name']);
        $elementFormID = $formSchema['schema']['fields'][0]['children'][0]['children'][0]['id'];
        $this->assertSame('Form_ElementForm_' . $id . '_Title', $elementFormID);
        $this->assertSame('action_save', $formSchema['schema']['actions'][0]['name']);
        // state node is flattened, unlike schema node
        $this->assertSame('PageElements_' . $id. '_Title', $formSchema['state']['fields'][3]['name']);
        $this->assertSame('Updated title', $formSchema['state']['fields'][3]['value']);
        if ($fail) {
            // assert errors node
            $field = $fail === 'validate' ? 'PageElements_' . $id . '_Fail' : 'Fail';
            $expected = [
                [
                    'value' => "Fail was $fail",
                    'type' => 'error',
                    'field' => $field,
                ]
            ];
            $this->assertSame($expected, $formSchema['errors']);
            // assert database was not updated
            $element = TestElementContent::get()->byID($id);
            $this->assertSame($element->Title, 'TestElementContent01 Title');
        } else {
            // assert there are no errors
            $this->assertFalse(array_key_exists('errors', $formSchema));
            // assert database was updated
            $element = TestElementContent::get()->byID($id);
            $this->assertSame($element->Title, 'Updated title');
        }
    }

    public static function provideElementFormReadonly(): array
    {
        return [
            'Can edit' => [
                'fail' => '',
                "expected" => false,
            ],
            'Cannot edit' => [
                'fail' => 'can-edit',
                "expected" => true,
            ],
        ];
    }

    #[DataProvider('provideElementFormReadonly')]
    public function testElementFormReadonly(string $fail, bool $expected): void
    {
        TestElementContent::$fail = $fail;
        $element = $this->objFromFixture(TestElementContent::class, 'TestElementContent01');
        $id = $element->ID;
        $url = "/admin/elemental-area/schema/elementForm/$id";
        $headers = $this->getFormSchemaHeader();
        $body = $this->get($url, null, $headers)->getBody();
        $json = json_decode($body, true);
        $actual = $json['schema']['fields'][0]['children'][0]['readOnly'] ?? false;
        $this->assertSame($expected, $actual);
    }

    public static function provideApiDelete(): array
    {
        return [
            'Valid' => [
                'idType' => 'existing',
                'fail' => '',
                'expectedCode' => 204,
            ],
            'Reject fail canDelete()' => [
                'idType' => 'existing',
                'fail' => 'can-delete',
                'expectedCode' => 403,
            ],
            'Reject fail csrf-token' => [
                'idType' => 'existing',
                'fail' => 'csrf-token',
                'expectedCode' => 400,
            ],
            'Reject invalid ID' => [
                'idType' => 'invalid',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject missing ID' => [
                'idType' => 'missing',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject non-numeric ID' => [
                'idType' => 'non-numeric',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject new record ID' => [
                'idType' => 'new-record',
                'fail' => '',
                'expectedCode' => 400,
            ],
        ];
    }

    #[DataProvider('provideApiDelete')]
    public function testApiDelete(
        string $idType,
        string $fail,
        int $expectedCode
    ): void {
        TestElementContent::$fail = $fail;
        $id = $this->getID($idType);
        $fixtureID = $this->getElementFixture()->ID;
        $url = "/admin/elemental-area/api/delete";
        $body = json_encode(['id' => $id]);
        $headers = [];
        if ($fail !== 'csrf-token') {
            $headers = array_merge($headers, $this->getCsrfTokenheader());
        }
        $response = $this->mainSession->sendRequest('POST', $url, [], $headers, null, $body);
        $this->assertSame('application/json', $response->getHeader('Content-type'));
        $this->assertSame($expectedCode, $response->getStatusCode());
        if ($expectedCode >= 400) {
            $this->assertNotNull(TestElementContent::get()->byID($fixtureID));
        } else {
            $this->assertNull(TestElementContent::get()->byID($fixtureID));
        }
    }

    public static function provideApiCreate(): array
    {
        return [
            'Valid' => [
                'fail' => '',
                'insertAfterElementID' => null,
                'expectedCode' => 204,
            ],
            'Valid after ID' => [
                'fail' => '',
                'insertAfterElementID' => 2,
                'expectedCode' => 204,
            ],
            'Reject fail canCreate()' => [
                'fail' => 'can-create',
                'insertAfterElementID' => null,
                'expectedCode' => 403,
            ],
            'Reject fail elemental-area canEdit()' => [
                'fail' => 'elemental-area-can-edit',
                'insertAfterElementID' => null,
                'expectedCode' => 403,
            ],
            'Reject invalid after ID' => [
                'fail' => '',
                'insertAfterElementID' => -1,
                'expectedCode' => 400,
            ],
            'Reject fail csrf-token' => [
                'fail' => 'csrf-token',
                'insertAfterElementID' => null,
                'expectedCode' => 400,
            ],
            'Reject no subclass' => [
                'fail' => 'no-subclass',
                'insertAfterElementID' => null,
                'expectedCode' => 400,
            ],
            'Reject invalid subclass' => [
                'fail' => 'invalid-subclass',
                'insertAfterElementID' => null,
                'expectedCode' => 400,
            ],
            'Reject no area' => [
                'fail' => 'no-area',
                'insertAfterElementID' => null,
                'expectedCode' => 400,
            ],
            'Reject invalid area' => [
                'fail' => 'invalid-area',
                'insertAfterElementID' => null,
                'expectedCode' => 400,
            ],
        ];
    }

    #[DataProvider('provideApiCreate')]
    public function testApiCreate(
        string $fail,
        ?int $insertAfterElementID,
        int $expectedCode
    ): void {
        TestElementContent::$fail = $fail;
        if (str_contains($fail, 'elemental-area')) {
            TestElementalArea::$fail = str_replace('elemental-area-', '', $fail);
        }
        $url = '/admin/elemental-area/api/create';
        $headers = [];
        if ($fail !== 'csrf-token') {
            $headers = array_merge($headers, $this->getCsrfTokenheader());
        }
        $elementClass = match ($fail) {
            'no-subclass' => '',
            'invalid-subclass' => TestElementalArea::class,
            default => TestElementContent::class,
        };
        $data = [
            'elementClass' => $elementClass,
        ];
        if ($fail !== 'no-area') {
            $data['elementalAreaID'] = match ($fail) {
                'invalid-area' => TestElementalArea::get()->max('ID') + 1,
                default => TestElementalArea::get()->first()->ID,
            };
        }
        if ($insertAfterElementID) {
            $data['insertAfterElementID'] = $insertAfterElementID;
        }
        $body = json_encode($data);
        $response = $this->mainSession->sendRequest('POST', $url, [], $headers, null, $body);
        $this->assertSame('application/json', $response->getHeader('Content-type'));
        $this->assertSame($expectedCode, $response->getStatusCode());
        if ($expectedCode >= 400) {
            $expected = [
                'TestElementContent01 Title' => 1,
                'TestElementContent02 Title' => 2,
                'TestElementContent03 Title' => 3,
            ];
        } elseif ($insertAfterElementID === 2) {
            $expected = [
                'TestElementContent01 Title' => 1,
                'TestElementContent02 Title' => 2,
                '' => 3,
                'TestElementContent03 Title' => 4,
            ];
        } else {
            $expected = [
                'TestElementContent01 Title' => 1,
                'TestElementContent02 Title' => 2,
                'TestElementContent03 Title' => 3,
                '' => 4,
            ];
        }
        $map = TestElementContent::get()->sort('Sort')->map('Title', 'Sort')->toArray();
        $this->assertSame($expected, $map);
    }

    public static function provideApiDuplicate(): array
    {
        return [
            'Valid' => [
                'idType' => 'existing',
                'fail' => '',
                'expectedCode' => 204,
            ],
            'Reject fail canCreate()' => [
                'idType' => 'existing',
                'fail' => 'can-create',
                'expectedCode' => 403,
            ],
            'Reject fail elemental-area canEdit()' => [
                'idType' => 'existing',
                'fail' => 'elemental-area-can-edit',
                'expectedCode' => 403,
            ],
            'Reject fail csrf-token' => [
                'idType' => 'existing',
                'fail' => 'csrf-token',
                'expectedCode' => 400,
            ],
            'Reject invalid ID' => [
                'idType' => 'invalid',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject missing ID' => [
                'idType' => 'missing',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject non-numeric ID' => [
                'idType' => 'non-numeric',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject new record ID' => [
                'idType' => 'new-record',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Element no parent' => [
                'idType' => 'existing',
                'fail' => 'no-parent',
                'expectedCode' => 400,
            ],
        ];
    }

    #[DataProvider('provideApiDuplicate')]
    public function testApiDuplicate(
        string $idType,
        string $fail,
        int $expectedCode
    ): void {
        TestElementContent::$fail = $fail;
        if (str_contains($fail, 'elemental-area')) {
            TestElementalArea::$fail = str_replace('elemental-area-', '', $fail);
        }
        $id = $this->getID($idType);
        $fixture = $this->getElementFixture();
        if ($fail == 'no-parent') {
            $fixture->ParentID = 0;
            $fixture->write();
        }
        $url = '/admin/elemental-area/api/duplicate';
        $headers = [];
        if ($fail !== 'csrf-token') {
            $headers = array_merge($headers, $this->getCsrfTokenheader());
        }
        $data = [];
        if ($id !== -1) {
            $data['id'] = $id;
        }
        $body = json_encode($data);
        $response = $this->mainSession->sendRequest('POST', $url, [], $headers, null, $body);
        $this->assertSame('application/json', $response->getHeader('Content-type'));
        $this->assertSame($expectedCode, $response->getStatusCode());
        $newElement = TestElementContent::get()->filter('Title', 'TestElementContent01 Title copy')->first();
        if ($expectedCode >= 400) {
            $this->assertNull($newElement);
        } else {
            $this->assertNotNull($newElement);
            $expected = [
                'TestElementContent01 Title' => 1,
                'TestElementContent01 Title copy' => 2,
                'TestElementContent02 Title' => 3,
                'TestElementContent03 Title' => 4,
            ];
            $map = TestElementContent::get()->sort('Sort')->map('Title', 'Sort')->toArray();
            $this->assertSame($expected, $map);
        }
    }

    public static function provideApiPublish(): array
    {
        return [
            'Valid' => [
                'idType' => 'existing',
                'fail' => '',
                'expectedCode' => 204,
            ],
            'Reject fail canPublish()' => [
                'idType' => 'existing',
                'fail' => 'can-publish',
                'expectedCode' => 403,
            ],
            'Reject fail csrf-token' => [
                'idType' => 'existing',
                'fail' => 'csrf-token',
                'expectedCode' => 400,
            ],
            'Reject invalid ID' => [
                'idType' => 'invalid',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject missing ID' => [
                'idType' => 'missing',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject non-numeric ID' => [
                'idType' => 'non-numeric',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject new record ID' => [
                'idType' => 'new-record',
                'fail' => '',
                'expectedCode' => 400,
            ],
        ];
    }

    #[DataProvider('provideApiPublish')]
    public function testApiPublish(
        string $idType,
        string $fail,
        int $expectedCode
    ): void {
        $fixture = $this->getElementFixture();
        try {
            TestElementContent::$fail = $fail;
            $id = $this->getID($idType);
            $url = '/admin/elemental-area/api/publish';
            $headers = [];
            if ($fail !== 'csrf-token') {
                $headers = array_merge($headers, $this->getCsrfTokenheader());
            }
            $data = [];
            if ($id !== -1) {
                $data['id'] = $id;
            }
            $body = json_encode($data);
            $this->assertFalse($fixture->isPublished());
            $response = $this->mainSession->sendRequest('POST', $url, [], $headers, null, $body);
            $this->assertSame('application/json', $response->getHeader('Content-type'));
            $this->assertSame($expectedCode, $response->getStatusCode());
            if ($expectedCode >= 400) {
                $this->assertFalse($fixture->isPublished());
            } else {
                $this->assertTrue($fixture->isPublished());
            }
        } finally {
            // fixtures will remain published between tests, fixtures are normally unpublished
            if ($fixture->isPublished()) {
                $fixture->doUnpublish();
            }
        }
    }

    public static function provideApiRead(): array
    {
        return [
            'Valid' => [
                'idType' => 'existing',
                'fail' => '',
                'expectedCode' => 200,
            ],
            'Valid fail canView()' => [
                'idType' => 'existing',
                'fail' => 'can-view',
                'expectedCode' => 200,
            ],
            'Reject fail elemental-area canView()' => [
                'idType' => 'existing',
                'fail' => 'elemental-area-can-view',
                'expectedCode' => 403,
            ],
            'Reject invalid ID' => [
                'idType' => 'invalid',
                'fail' => '',
                'expectedCode' => 404,
            ],
            'Reject missing ID' => [
                'idType' => 'missing',
                'fail' => '',
                'expectedCode' => 404,
            ],
            'Reject non-numeric ID' => [
                'idType' => 'non-numeric',
                'fail' => '',
                'expectedCode' => 404,
            ],
            'Reject new record ID' => [
                'idType' => 'new-record',
                'fail' => '',
                'expectedCode' => 404,
            ],
        ];
    }

    #[DataProvider('provideApiRead')]
    public function testApiRead(
        string $idType,
        string $fail,
        int $expectedCode
    ): void {
        TestElementContent::$fail = $fail;
        if (str_contains($fail, 'elemental-area')) {
            TestElementalArea::$fail = str_replace('elemental-area-', '', $fail);
        }
        $id = $this->getID($idType, 'elemental-area');
        $url = "/admin/elemental-area/api/readElements/$id";
        $data = [];
        if ($id !== -1) {
            $data['id'] = $id;
        }
        $response = $this->mainSession->sendRequest('GET', $url, []);
        $this->assertSame('application/json', $response->getHeader('Content-type'));
        $this->assertSame($expectedCode, $response->getStatusCode());
        $body = $response->getBody();
        if ($expectedCode === 200) {
            $editLinks = [];
            foreach (TestElementContent::get() as $element) {
                $editLinks[$element->ID] = $element->getEditLink();
            }
            if ($fail == 'can-view') {
                $expected = [];
            } else {
                $expected = [
                    [
                        'id' => 1,
                        'title' => 'TestElementContent01 Title',
                        'blockSchema' => [
                            'typeName' => 'DNADesign_Elemental_Tests_Blocks_TestElementContent',
                            'actions' => [
                                'edit' => $editLinks[1],
                            ],
                            'content' => 'Some HTML',
                        ],
                        'obsoleteClassName' => null,
                        'version' => 1,
                        'isPublished' => false,
                        'isLiveVersion' => false,
                        'canDelete' => true,
                        'canPublish' => true,
                        'canUnpublish' => true,
                        'canCreate' => true,
                    ],
                    [
                        'id' => 2,
                        'title' => 'TestElementContent02 Title',
                        'blockSchema' => [
                            'typeName' => 'DNADesign_Elemental_Tests_Blocks_TestElementContent',
                            'actions' => [
                                'edit' => $editLinks[2],
                            ],
                            'content' => 'Some HTML',
                        ],
                        'obsoleteClassName' => null,
                        'version' => 1,
                        'isPublished' => false,
                        'isLiveVersion' => false,
                        'canDelete' => true,
                        'canPublish' => true,
                        'canUnpublish' => true,
                        'canCreate' => true,
                    ],
                    [
                        'id' => 3,
                        'title' => 'TestElementContent03 Title',
                        'blockSchema' => [
                            'typeName' => 'DNADesign_Elemental_Tests_Blocks_TestElementContent',
                            'actions' => [
                                'edit' => $editLinks[3],
                            ],
                            'content' => 'Some HTML',
                        ],
                        'obsoleteClassName' => null,
                        'version' => 1,
                        'isPublished' => false,
                        'isLiveVersion' => false,
                        'canDelete' => true,
                        'canPublish' => true,
                        'canUnpublish' => true,
                        'canCreate' => true,
                    ],
                ];
            }
            $this->assertSame($expected, json_decode($body, true));
        }
    }

    public static function provideApiSort(): array
    {
        return [
            'Valid move from first' => [
                'idType' => 'existing',
                'fail' => '',
                'afterBlockID' => 2,
                'expectedCode' => 204,
            ],
            'Valid move to first' => [
                'idType' => 'existing',
                'fail' => '',
                'afterBlockID' => 0,
                'expectedCode' => 204,
            ],
            'Reject fail canEdit()' => [
                'idType' => 'existing',
                'fail' => 'can-edit',
                'afterBlockID' => 2,
                'expectedCode' => 403,
            ],
            'Reject fail csrf-token' => [
                'idType' => 'existing',
                'fail' => 'csrf-token',
                'afterBlockID' => 2,
                'expectedCode' => 400,
            ],
            'Reject invalid ID' => [
                'idType' => 'invalid',
                'fail' => '',
                'afterBlockID' => 2,
                'expectedCode' => 400,
            ],
            'Reject missing ID' => [
                'idType' => 'missing',
                'fail' => '',
                'afterBlockID' => 2,
                'expectedCode' => 400,
            ],
            'Reject non-numeric ID' => [
                'idType' => 'non-numeric',
                'fail' => '',
                'afterBlockID' => 2,
                'expectedCode' => 400,
            ],
            'Reject new record ID' => [
                'idType' => 'new-record',
                'fail' => '',
                'afterBlockID' => 2,
                'expectedCode' => 400,
            ],
        ];
    }

    #[DataProvider('provideApiSort')]
    public function testApiSort(
        string $idType,
        string $fail,
        int $afterBlockID,
        int $expectedCode
    ): void {
        TestElementContent::$fail = $fail;
        $id = $afterBlockID === 0 ? 2 : $this->getID($idType);
        $fixture = $this->getElementFixture();
        $url = '/admin/elemental-area/api/sort';
        $headers = [];
        if ($fail !== 'csrf-token') {
            $headers = array_merge($headers, $this->getCsrfTokenheader());
        }
        $data = [
            'afterBlockID' => $afterBlockID,
        ];
        if ($id !== -1) {
            $data['id'] = $id;
        }
        $body = json_encode($data);
        $response = $this->mainSession->sendRequest('POST', $url, [], $headers, null, $body);
        $this->assertSame('application/json', $response->getHeader('Content-type'));
        $this->assertSame($expectedCode, $response->getStatusCode());
        if ($expectedCode >= 400) {
            $expected = [
                'TestElementContent01 Title' => 1,
                'TestElementContent02 Title' => 2,
                'TestElementContent03 Title' => 3,
            ];
        } elseif ($afterBlockID === 0) {
            $expected = [
                'TestElementContent01 Title' => 2,
                'TestElementContent02 Title' => 1,
                'TestElementContent03 Title' => 3,
            ];
        } else {
            $expected = [
                'TestElementContent01 Title' => 2,
                'TestElementContent02 Title' => 1,
                'TestElementContent03 Title' => 3,
            ];
        }
        $map = TestElementContent::get()->sort('ID ASC')->map('Title', 'Sort')->toArray();
        $this->assertSame($expected, $map);
    }

    public static function provideApiUnpublish(): array
    {
        return [
            'Valid' => [
                'idType' => 'existing',
                'fail' => '',
                'expectedCode' => 204,
            ],
            'Reject fail canUnpublish()' => [
                'idType' => 'existing',
                'fail' => 'can-unpublish',
                'expectedCode' => 403,
            ],
            'Reject fail csrf-token' => [
                'idType' => 'existing',
                'fail' => 'csrf-token',
                'expectedCode' => 400,
            ],
            'Reject invalid ID' => [
                'idType' => 'invalid',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject missing ID' => [
                'idType' => 'missing',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject non-numeric ID' => [
                'idType' => 'non-numeric',
                'fail' => '',
                'expectedCode' => 400,
            ],
            'Reject new record ID' => [
                'idType' => 'new-record',
                'fail' => '',
                'expectedCode' => 400,
            ],
        ];
    }

    #[DataProvider('provideApiUnpublish')]
    public function testApiUnpublish(
        string $idType,
        string $fail,
        int $expectedCode
    ): void {
        $fixture = $this->getElementFixture();
        $fixture->publishSingle();
        try {
            TestElementContent::$fail = $fail;
            $id = $this->getID($idType);
            $url = '/admin/elemental-area/api/unpublish';
            $headers = [];
            if ($fail !== 'csrf-token') {
                $headers = array_merge($headers, $this->getCsrfTokenheader());
            }
            $data = [];
            if ($id !== -1) {
                $data['id'] = $id;
            }
            $body = json_encode($data);
            $this->assertTrue($fixture->isPublished());
            $response = $this->mainSession->sendRequest('POST', $url, [], $headers, null, $body);
            $this->assertSame('application/json', $response->getHeader('Content-type'));
            $this->assertSame($expectedCode, $response->getStatusCode());
            if ($expectedCode >= 400) {
                $this->assertTrue($fixture->isPublished());
            } else {
                $this->assertFalse($fixture->isPublished());
            }
        } finally {
            // fixtures will remain published between tests, fixtures are normally unpublished
            if ($fixture->isPublished()) {
                $fixture->doUnpublish();
            }
        }
    }

    private function getElementFixture(): TestElementContent
    {
        return $this->objFromFixture(TestElementContent::class, 'TestElementContent01');
    }

    private function getElementalAreaFixture(): TestElementalArea
    {
        return $this->objFromFixture(TestElementalArea::class, 'blocks_page_area');
    }

    private function getID(string $idType, string $type = 'element'): mixed
    {
        if ($type == 'element') {
            $obj = $this->getElementFixture();
        } elseif ($type == 'elemental-area') {
            $obj = $this->getElementalAreaFixture();
        } else {
            throw new Exception('Invalid type');
        }
        return match ($idType) {
            'existing' => $obj->ID,
            'invalid' => $obj->ID + 99999,
            'missing' => -1,
            'non-numeric' => 'fish',
            'new-record' => 0,
        };
    }

    private function getFormSchemaHeader(): array
    {
        return [
            'X-FormSchema-Request' => 'auto,schema,state,errors'
        ];
    }

    private function getCsrfTokenheader(): array
    {
        $securityToken = SecurityToken::inst();
        return [
            'X-' . $securityToken->getName() => $securityToken->getSecurityID()
        ];
    }
}
