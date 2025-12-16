/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import classnames from 'classnames';
import { Component as Content } from '../Content';

function makeProps(obj = {}) {
  return {
    fileUrl: '/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg',
    fileTitle: '',
    content: '',
    previewExpanded: false,
    ensureFormRendered: false,
    formHasRendered: false,
    InlineEditFormComponent: (props) => {
      const className = classnames({
        'test-inline-edit-form': true,
        ...props.extraClass
      });
      return <div className={className} />;
    },
    SummaryComponent: () => <div className="test-summary" />,
    ...obj,
  };
}

test('Content component - previewExpanded is true, ensureFormRendered is false, formHasRendered is false', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true,
      ensureFormRendered: false,
      formHasRendered: false,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(0);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(0);
});

test('Content component - previewExpanded is true, ensureFormRendered is true, formHasRendered is false', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true,
      ensureFormRendered: true,
      formHasRendered: false,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(0);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(0);
});

test('Content component - previewExpanded is true, ensureFormRendered is true, formHasRendered is true', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true,
      ensureFormRendered: true,
      formHasRendered: true,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(0);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(0);
});

test('Content component - previewExpanded is false, ensureFormRendered is true, formHasRendered is false', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: false,
      ensureFormRendered: true,
      formHasRendered: false,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(1);
});

test('Content component - previewExpanded is false, ensureFormRendered is true, formHasRendered is true', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: false,
      ensureFormRendered: true,
      formHasRendered: true,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(1);
});

test('Content renders even when no content or image is provided', () => {
  const { container } = render(
    <Content {...makeProps({
      fileUrl: '',
      previewExpanded: true
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
});

test('Content renders formDirty hidden input when formDirty is truthy', () => {
  const { container } = render(
    <Content {...makeProps({
      formDirty: { isDirty: true },
      previewExpanded: true
    })}
    />
  );
  const hiddenInput = container.querySelector('input[type="hidden"]');
  expect(hiddenInput).not.toBeNull();
  expect(hiddenInput.className).toBe('element-form-dirty-state');
  expect(hiddenInput.name).toBe('change-tracker');
  expect(hiddenInput.value).toBe('1');
});

test('Content does not render formDirty hidden input when formDirty is falsy', () => {
  const { container } = render(
    <Content {...makeProps({
      formDirty: null,
      previewExpanded: true
    })}
    />
  );
  const hiddenInput = container.querySelector('input[type="hidden"]');
  expect(hiddenInput).toBeNull();
});

test('Content passes correct props to SummaryComponent when previewExpanded is false', () => {
  let capturedProps = {};
  const mockSummaryComponent = (props) => {
    capturedProps = props;
    return <div className="test-summary" />;
  };
  render(
    <Content
      {...makeProps({
        previewExpanded: false,
        content: 'test content',
        fileUrl: '/test/image.jpg',
        fileTitle: 'Test Image',
        broken: true
      })}
      SummaryComponent={mockSummaryComponent}
    />
  );
  expect(capturedProps.content).toBe('test content');
  expect(capturedProps.fileUrl).toBe('/test/image.jpg');
  expect(capturedProps.fileTitle).toBe('Test Image');
  expect(capturedProps.broken).toBe(true);
});

test('Content passes correct props to InlineEditFormComponent', () => {
  let capturedProps = {};
  const mockInlineEditForm = (props) => {
    capturedProps = props;
    const className = classnames({
      'test-inline-edit-form': true,
      ...props.extraClass
    });
    return <div className={className} />;
  };
  const mockOnFormInit = jest.fn();
  const mockHandleLoadingError = jest.fn();
  const mockOnFormSchemaSubmitResponse = jest.fn();
  render(
    <Content
      {...makeProps({
        id: 42,
        previewExpanded: true,
        activeTab: 'some-tab',
        onFormInit: mockOnFormInit,
        handleLoadingError: mockHandleLoadingError,
        onFormSchemaSubmitResponse: mockOnFormSchemaSubmitResponse
      })}
      InlineEditFormComponent={mockInlineEditForm}
    />
  );
  expect(capturedProps.elementId).toBe(42);
  expect(capturedProps.activeTab).toBe('some-tab');
  expect(capturedProps.onFormInit).toBe(mockOnFormInit);
  expect(capturedProps.handleLoadingError).toBe(mockHandleLoadingError);
  expect(capturedProps.onFormSchemaSubmitResponse).toBe(mockOnFormSchemaSubmitResponse);
});

test('Content previewExpanded false without ensureFormRendered or formHasRendered does not render form', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: false,
      ensureFormRendered: false,
      formHasRendered: false
    })}
    />
  );
  expect(container.querySelectorAll('.test-summary')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(0);
});

test('Content passes notVisible prop to InlineEditFormComponent when collapsed and form is rendered', () => {
  let capturedProps = {};
  const mockInlineEditForm = (props) => {
    capturedProps = props;
    const className = classnames({
      'test-inline-edit-form': true,
      ...props.extraClass
    });
    return <div className={className} />;
  };
  render(
    <Content
      {...makeProps({
        previewExpanded: false,
        ensureFormRendered: true,
        formHasRendered: false
      })}
      InlineEditFormComponent={mockInlineEditForm}
    />
  );
  expect(capturedProps.notVisible).toBe(true);
});

test('Content passes notVisible false to InlineEditFormComponent when expanded', () => {
  let capturedProps = {};
  const mockInlineEditForm = (props) => {
    capturedProps = props;
    const className = classnames({
      'test-inline-edit-form': true,
      ...props.extraClass
    });
    return <div className={className} />;
  };
  render(
    <Content
      {...makeProps({
        previewExpanded: true,
        ensureFormRendered: false,
        formHasRendered: false
      })}
      InlineEditFormComponent={mockInlineEditForm}
    />
  );
  expect(capturedProps.notVisible).toBe(false);
});

test('Content renders wrapper div with onPointerDown handler when form should render', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true,
      ensureFormRendered: false,
      formHasRendered: false
    })}
    />
  );
  const wrapperDiv = container.querySelector('.element-editor-content > div > .test-inline-edit-form');
  expect(wrapperDiv).not.toBeNull();
});

test('Content with previewExpanded false and formHasRendered true renders form off-screen', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: false,
      ensureFormRendered: false,
      formHasRendered: true
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
});
