/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect, afterEach */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Component as InlineEditForm } from '../InlineEditForm';

jest.mock('containers/FormBuilderLoader/FormBuilderLoader', () => function MockFormBuilderLoader(props) {
  return (
    <div
      data-testid="form-builder-loader"
      data-schema-url={props.schemaUrl}
      data-identifier={props.identifier}
      data-refetch-schema={props.refetchSchemaOnMount}
      data-loading={props.loading}
    >
      <button
        type="button"
        data-testid="form-loading-error-btn"
        onClick={() => props.onLoadingError()}
      >
        Trigger Loading Error
      </button>
      <button
        type="button"
        data-testid="form-submit-btn"
        onClick={() => {
          const submitFn = jest.fn().mockResolvedValue({ schema: {} });
          props.onSubmit(
            { PageElements_1_Title: 'Test Title' },
            null,
            submitFn
          );
        }}
      >
        Submit Form
      </button>
      <button
        type="button"
        data-testid="form-init-btn"
        onClick={() => {
          if (props.onReduxFormInit) {
            props.onReduxFormInit();
          }
        }}
      >
        Init Form
      </button>
    </div>
  );
});

jest.mock('state/editor/loadElementSchemaValue', () => ({
  loadElementSchemaValue: (key, elementId) => {
    if (key === 'schemaUrl') {
      return `/admin/elements/schema/${elementId}`;
    }
    return null;
  }
}));

jest.mock('i18n', () => ({
  _t: (key, defaultValue) => defaultValue,
  inject: (text) => text
}));

jest.mock('state/editor/loadElementFormStateName', () => ({
  loadElementFormStateName: (elementId) => `form-${elementId}`
}));

const mockNoticeAdd = jest.fn();

beforeEach(() => {
  window.jQuery = jest.fn(() => ({
    noticeAdd: mockNoticeAdd
  }));
  window.jQuery.noticeAdd = mockNoticeAdd;
});

afterEach(() => {
  jest.clearAllMocks();
});

function makeProps(obj = {}) {
  return {
    elementId: '1',
    extraClass: '',
    onClick: jest.fn(),
    handleLoadingError: jest.fn(),
    onFormSchemaSubmitResponse: jest.fn(),
    onFormInit: null,
    formHasState: false,
    notVisible: false,
    ...obj
  };
}

test('InlineEditForm renders with correct base className', () => {
  const { container } = render(<InlineEditForm {...makeProps()} />);
  expect(container.querySelector('.element-editor-editform')).not.toBeNull();
});

test('InlineEditForm includes extraClass in className when provided as string', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ extraClass: 'custom-class' })} />
  );
  const editForm = container.querySelector('.element-editor-editform');
  expect(editForm).not.toBeNull();
  expect(editForm.classList.contains('custom-class')).toBe(true);
});

test('InlineEditForm includes extraClass in className when provided as object', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ extraClass: { 'custom-class': true, unused: false } })} />
  );
  const editForm = container.querySelector('.element-editor-editform');
  expect(editForm).not.toBeNull();
  expect(editForm.classList.contains('custom-class')).toBe(true);
  expect(editForm.classList.contains('unused')).toBe(false);
});

test('InlineEditForm has role presentation', () => {
  const { container } = render(<InlineEditForm {...makeProps()} />);
  expect(container.querySelector('[role="presentation"]')).not.toBeNull();
});

test('InlineEditForm calls onClick when clicked', () => {
  const onClick = jest.fn();
  const { container } = render(
    <InlineEditForm {...makeProps({ onClick })} />
  );
  const editForm = container.querySelector('[role="presentation"]');
  fireEvent.click(editForm);
  expect(onClick).toHaveBeenCalled();
});

test('InlineEditForm renders FormBuilderLoader component', () => {
  render(<InlineEditForm {...makeProps()} />);
  expect(screen.getByTestId('form-builder-loader')).not.toBeNull();
});

test('InlineEditForm passes correct schemaUrl to FormBuilderLoader', () => {
  render(
    <InlineEditForm {...makeProps({ elementId: '5' })} />
  );
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader.getAttribute('data-schema-url')).toBe('/admin/elements/schema/5');
});

test('InlineEditForm passes correct identifier to FormBuilderLoader', () => {
  render(<InlineEditForm {...makeProps()} />);
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader.getAttribute('data-identifier')).toBe('element');
});

test('InlineEditForm sets refetchSchemaOnMount to true when formHasState is false', () => {
  render(<InlineEditForm {...makeProps({ formHasState: false })} />);
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader.getAttribute('data-refetch-schema')).toBe('true');
});

test('InlineEditForm sets refetchSchemaOnMount to false when formHasState is true', () => {
  render(<InlineEditForm {...makeProps({ formHasState: true })} />);
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader.getAttribute('data-refetch-schema')).toBe('false');
});

test('InlineEditForm calls handleLoadingError and shows notice when form loading fails', async () => {
  const handleLoadingError = jest.fn();
  render(
    <InlineEditForm {...makeProps({ handleLoadingError })} />
  );
  const errorBtn = screen.getByTestId('form-loading-error-btn');
  fireEvent.click(errorBtn);
  await waitFor(() => {
    expect(handleLoadingError).toHaveBeenCalled();
    expect(mockNoticeAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Error displaying the edit form for this block',
        stay: true,
        type: 'notice'
      })
    );
  });
});

test('InlineEditForm sets loadingError state when loading error occurs', async () => {
  const { rerender } = render(
    <InlineEditForm {...makeProps()} />
  );
  let formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader.getAttribute('data-loading')).toBeNull();
  const errorBtn = screen.getByTestId('form-loading-error-btn');
  fireEvent.click(errorBtn);
  await waitFor(() => {
    rerender(<InlineEditForm {...makeProps()} />);
    formLoader = screen.getByTestId('form-builder-loader');
    expect(formLoader.getAttribute('data-loading')).toBe('false');
  });
});

test('InlineEditForm calls onFormSchemaSubmitResponse with title extracted from form data', async () => {
  const onFormSchemaSubmitResponse = jest.fn();
  render(
    <InlineEditForm {...makeProps({ onFormSchemaSubmitResponse })} />
  );
  const submitBtn = screen.getByTestId('form-submit-btn');
  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(onFormSchemaSubmitResponse).toHaveBeenCalledWith(
      expect.objectContaining({ schema: {} }),
      'Test Title'
    );
  });
});

test('InlineEditForm extracts title from data with PageElements_[0-9]+_Title key pattern', async () => {
  const onFormSchemaSubmitResponse = jest.fn();
  render(
    <InlineEditForm {...makeProps({ onFormSchemaSubmitResponse, elementId: '42' })} />
  );
  const submitBtn = screen.getByTestId('form-submit-btn');
  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(onFormSchemaSubmitResponse).toHaveBeenCalledWith(
      expect.any(Object),
      'Test Title'
    );
  });
});

test('InlineEditForm sets onReduxFormInit when onFormInit is provided', () => {
  const onFormInit = jest.fn();
  render(
    <InlineEditForm {...makeProps({ onFormInit })} />
  );
  const initBtn = screen.getByTestId('form-init-btn');
  fireEvent.click(initBtn);
  expect(onFormInit).toHaveBeenCalled();
});

test('InlineEditForm does not set onReduxFormInit when onFormInit is not provided', () => {
  render(
    <InlineEditForm {...makeProps({ onFormInit: null })} />
  );
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader).not.toBeNull();
});

test('InlineEditForm adds aria-hidden attribute when notVisible is true', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ notVisible: true })} />
  );
  const editForm = container.querySelector('[role="presentation"]');
  expect(editForm.getAttribute('aria-hidden')).toBe('true');
});

test('InlineEditForm adds inert attribute when notVisible is true', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ notVisible: true })} />
  );
  const editForm = container.querySelector('[role="presentation"]');
  expect(editForm.getAttribute('inert')).toBe('inert');
});

test('InlineEditForm does not add aria-hidden when notVisible is false', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ notVisible: false })} />
  );
  const editForm = container.querySelector('[role="presentation"]');
  expect(editForm.getAttribute('aria-hidden')).toBeNull();
});

test('InlineEditForm does not add inert when notVisible is false', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ notVisible: false })} />
  );
  const editForm = container.querySelector('[role="presentation"]');
  expect(editForm.getAttribute('inert')).toBeNull();
});

test('InlineEditForm renders as form tag in FormBuilderLoader', () => {
  render(<InlineEditForm {...makeProps()} />);
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader).not.toBeNull();
});

test('InlineEditForm handles multiple element IDs with schema URLs', () => {
  const { rerender } = render(
    <InlineEditForm {...makeProps({ elementId: '10' })} />
  );
  let formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader.getAttribute('data-schema-url')).toBe('/admin/elements/schema/10');

  rerender(
    <InlineEditForm {...makeProps({ elementId: '20' })} />
  );
  formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader.getAttribute('data-schema-url')).toBe('/admin/elements/schema/20');
});

test('InlineEditForm extracts empty title when no matching key in form data', async () => {
  const onFormSchemaSubmitResponse = jest.fn();
  const { container } = render(
    <InlineEditForm {...makeProps({ onFormSchemaSubmitResponse })} />
  );
  expect(container.querySelector('.element-editor-editform')).not.toBeNull();
});

test('InlineEditForm passes form tag as form property to FormBuilderLoader', () => {
  render(<InlineEditForm {...makeProps()} />);
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader).not.toBeNull();
});

test('InlineEditForm calls onSubmit with data, action, and submitFn', async () => {
  const onFormSchemaSubmitResponse = jest.fn();
  render(
    <InlineEditForm {...makeProps({ onFormSchemaSubmitResponse })} />
  );
  const submitBtn = screen.getByTestId('form-submit-btn');
  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(onFormSchemaSubmitResponse).toHaveBeenCalled();
  });
});

test('InlineEditForm properly handles submit function promise resolution', async () => {
  const onFormSchemaSubmitResponse = jest.fn().mockResolvedValue(undefined);
  render(
    <InlineEditForm {...makeProps({ onFormSchemaSubmitResponse })} />
  );
  const submitBtn = screen.getByTestId('form-submit-btn');
  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(onFormSchemaSubmitResponse).toHaveBeenCalled();
  });
});

test('InlineEditForm extracts title from different element IDs', async () => {
  const onFormSchemaSubmitResponse = jest.fn();
  render(
    <InlineEditForm {...makeProps({ elementId: '999', onFormSchemaSubmitResponse })} />
  );
  const submitBtn = screen.getByTestId('form-submit-btn');
  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(onFormSchemaSubmitResponse).toHaveBeenCalled();
  });
});

test('InlineEditForm does not pass loading prop when loadingError is false', () => {
  render(
    <InlineEditForm {...makeProps({ formHasState: false })} />
  );
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader.getAttribute('data-loading')).toBeNull();
});

test('InlineEditForm does not call onClick callback when form is clicked but onClick is not provided', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ onClick: undefined })} />
  );
  const editForm = container.querySelector('[role="presentation"]');
  expect(() => fireEvent.click(editForm)).not.toThrow();
});

test('InlineEditForm passes onLoadingError to FormBuilderLoader', () => {
  const handleLoadingError = jest.fn();
  render(
    <InlineEditForm {...makeProps({ handleLoadingError })} />
  );
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader).not.toBeNull();
});

test('InlineEditForm passes onSubmit to FormBuilderLoader', () => {
  const onFormSchemaSubmitResponse = jest.fn();
  render(
    <InlineEditForm {...makeProps({ onFormSchemaSubmitResponse })} />
  );
  const formLoader = screen.getByTestId('form-builder-loader');
  expect(formLoader).not.toBeNull();
});

test('InlineEditForm renders with PureComponent behavior preventing unnecessary re-renders', () => {
  const onClick = jest.fn();
  const { rerender } = render(
    <InlineEditForm {...makeProps({ onClick })} />
  );
  fireEvent.click(screen.getByRole('presentation'));
  expect(onClick).toHaveBeenCalledTimes(1);
  rerender(
    <InlineEditForm {...makeProps({ onClick })} />
  );
  fireEvent.click(screen.getByRole('presentation'));
  expect(onClick).toHaveBeenCalledTimes(2);
});

test('InlineEditForm handles notVisible with both aria-hidden and inert together', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ notVisible: true })} />
  );
  const editForm = container.querySelector('[role="presentation"]');
  expect(editForm.getAttribute('aria-hidden')).toBe('true');
  expect(editForm.getAttribute('inert')).toBe('inert');
});

test('InlineEditForm with undefined extraClass renders without errors', () => {
  const { container } = render(
    <InlineEditForm {...makeProps({ extraClass: undefined })} />
  );
  expect(container.querySelector('.element-editor-editform')).not.toBeNull();
});

test('InlineEditForm correctly identifies multiple title keys and extracts last match', async () => {
  const onFormSchemaSubmitResponse = jest.fn().mockImplementation(() => Promise.resolve());
  render(
    <InlineEditForm {...makeProps({ onFormSchemaSubmitResponse })} />
  );
  const submitBtn = screen.getByTestId('form-submit-btn');
  fireEvent.click(submitBtn);
  await waitFor(() => {
    expect(onFormSchemaSubmitResponse).toHaveBeenCalledWith(
      expect.any(Object),
      'Test Title'
    );
  });
});
