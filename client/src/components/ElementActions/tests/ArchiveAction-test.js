/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Component as ArchiveAction } from '../ArchiveAction';
import { ElementEditorContext } from '../../ElementEditor/ElementEditor';

let resolveBackendPost;
let rejectBackendPost;
let lastBackendPostEndpoint;
let lastBackendPostData;
let lastToastErrorMessage;
let resolveFetchElements;
let fetchElementsPromise;
let fetchElements;

beforeEach(() => {
  resolveBackendPost = undefined;
  rejectBackendPost = undefined;
  lastBackendPostEndpoint = undefined;
  lastBackendPostData = undefined;
  lastToastErrorMessage = undefined;
  resolveFetchElements = undefined;
  fetchElementsPromise = undefined;
  fetchElements = undefined;
});

jest.mock('lib/Backend', () => ({
  post: (endpoint, data) => new Promise((resolve, reject) => {
    lastBackendPostEndpoint = endpoint;
    lastBackendPostData = data;
    resolveBackendPost = resolve;
    rejectBackendPost = reject;
  })
}));

const sectionConfigKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
window.ss.config = {
  SecurityID: 1234567890,
  sections: [
    {
      name: sectionConfigKey,
      controllerLink: 'my/test/endpoint',
    },
  ],
};

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = ArchiveAction(WrappedComponent);

window.jQuery = {
  noticeAdd: ({ text }) => {
    lastToastErrorMessage = text;
  }
};

function makeProps(obj = {}) {
  return {
    title: 'My abstract action',
    element: {
      id: 123,
      isPublished: true,
    },
    actions: {
      handleArchiveBlock: () => {},
    },
    toggle: false,
    ...obj,
  };
}

function makeProviderProps(obj = {}) {
  return {
    value: {
      fetchElements: () => {},
      ...obj,
    }
  };
}

function createJsonError(message) {
  return {
    response: {
      json: () => Promise.resolve({
        errors: [
          {
            value: message
          }
        ],
      }),
    },
  };
}

test('ArchiveAction renders the title and class', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelector('button.element-editor__actions-archive').textContent).toBe('Archive');
});

test('ArchiveAction does not archive when declining the confirmation', async () => {
  resolveBackendPost = 'lorem ipsum';
  global.confirm = () => false;
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-archive'));
  // mock backend post method was never called, therefore resolveBackendPost value unchanged
  expect(resolveBackendPost).toBe('lorem ipsum');
});

function setupAcceptTest() {
  global.confirm = () => true;
  fetchElementsPromise = new Promise((resolve) => {
    resolveFetchElements = resolve;
  });
  fetchElements = jest.fn(() => {
    resolveFetchElements();
  });
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps({ fetchElements })}>
      <ActionComponent {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-archive'));
}

test('ArchiveAction archives when accepting the confirmation', async () => {
  setupAcceptTest();
  resolveBackendPost();
  await Promise.all([fetchElementsPromise]);
  expect(fetchElements).toHaveBeenCalled();
  expect(lastBackendPostEndpoint).toBe('my/test/endpoint/api/delete');
  expect(lastBackendPostData).toEqual({
    id: 123,
  });
});

test('ArchiveAction reject known error', async () => {
  setupAcceptTest();
  rejectBackendPost(createJsonError('Cannot delete element'));
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe('Cannot delete element');
});

test('ArchiveAction reject unknown error', async () => {
  setupAcceptTest();
  rejectBackendPost();
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe('An unknown error has occurred.');
});

test('ArchiveAction indicates that the block will be sent to archive when it is unpublished', () => {
  const mockConfirm = jest.fn();
  global.confirm = mockConfirm;
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps({
        element: {
          isPublished: false,
        }
      })}
      />
    </ElementEditorContext.Provider>
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-archive'));
  expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to send this block to the archive?');
});

test('ArchiveAction indicates that the block will be sent to archive when it is published', () => {
  const mockConfirm = jest.fn();
  global.confirm = mockConfirm;
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps({
        element: {
          isPublished: true,
        }
      })}
      />
    </ElementEditorContext.Provider>
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-archive'));
  expect(mockConfirm).toHaveBeenCalledWith('Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?');
});

test('ArchiveAction is disabled when user doesn\'t have correct permissions', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps({
        element: {
          canDelete: false
        }
      })}
      />
    </ElementEditorContext.Provider>
  );
  expect(container.querySelector('button.element-editor__actions-archive').disabled).toBe(true);
});

test('ArchiveAction renders a button even when block is broken', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps({
        type: {
          broken: true
        }
      })}
      />
    </ElementEditorContext.Provider>
  );
  expect(container.querySelectorAll('button.element-editor__actions-archive')).toHaveLength(1);
});
