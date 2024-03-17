<?php

namespace DNADesign\Elemental\Tests\Controllers;

use SilverStripe\Dev\FunctionalTest;
use SilverStripe\Security\SecurityToken;
use DNADesign\Elemental\Tests\Blocks\TestElementContent;

class ElementalAreaControllerTest extends FunctionalTest
{
    protected static $fixture_file = 'ElementalAreaControllerTest.yml';
    
    protected static $extra_dataobjects = [
        TestElementContent::class,
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
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        if (!$this->securityTokenWasEnabled) {
            SecurityToken::disable();
        }
    }

    public function provideElementFormGetSchema(): array
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

    /**
     * @dataProvider provideElementFormGetSchema
     */
    public function testElementFormGetSchema(
        string $fail,
        int $expectedCode,
    ): void {
        TestElementContent::$fail = $fail;
        $element = $this->objFromFixture(TestElementContent::class, 'blocks_page_content');
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
        $this->assertSame('My title', $formSchema['state']['fields'][3]['value']);
        $this->assertFalse(array_key_exists('errors', $formSchema));
    }

    public function provideElementFormPost(): array
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
                'expectedCode' => 400,
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

    /**
     * @dataProvider provideElementFormPost
     */
    public function testElementFormPost(string $idType, string $dataType, string $fail, int $expectedCode): void
    {
        TestElementContent::$fail = $fail;
        $element = $this->objFromFixture(TestElementContent::class, 'blocks_page_content');
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
            $this->assertSame($element->Title, 'My title');
        } else {
            // assert errors node is empty
            $this->assertEmpty($formSchema['errors']);
            // assert database was updated
            $element = TestElementContent::get()->byID($id);
            $this->assertSame($element->Title, 'Updated title');
        }
    }

    public function provideElementFormReadonly(): array
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

    /**
     * @dataProvider provideElementFormReadonly
     */
    public function testElementFormReadonly(string $fail, bool $expected): void
    {
        TestElementContent::$fail = $fail;
        $element = $this->objFromFixture(TestElementContent::class, 'blocks_page_content');
        $id = $element->ID;
        $url = "/admin/elemental-area/schema/elementForm/$id";
        $headers = $this->getFormSchemaHeader();
        $body = $this->get($url, null, $headers)->getBody();
        $json = json_decode($body, true);
        $actual = $json['schema']['fields'][0]['children'][0]['readOnly'] ?? false;
        $this->assertSame($expected, $actual);
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
