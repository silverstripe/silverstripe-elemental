/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Component as DuplicateAction } from '../DuplicateAction';
import { ElementEditorContext } from '../../ElementEditor/ElementEditor';

let resolveBackendPost;
let rejectBackendPost;
let lastBackendPostEndpoint;
let lastBackendPostData;
let lastToastErrorMessage;

beforeEach(() => {
  resolveBackendPost = undefined;
  rejectBackendPost = undefined;
  lastBackendPostEndpoint = undefined;
  lastBackendPostData = undefined;
  lastToastErrorMessage = undefined;
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

window.jQuery = {
  noticeAdd: ({ text }) => {
    lastToastErrorMessage = text;
  }
};

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = DuplicateAction(WrappedComponent);

function makeProps(obj = {}) {
  return {
    title: 'My duplicate action',
    element: {
      id: 123,
      BlockSchema: { type: 'Test' },
      canCreate: true,
    },
    type: {
      broken: false
    },
    actions: {
      handlePublishBlock: () => {}
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

test('DuplicateAction renders a button', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelectorAll('button.element-editor__actions-duplicate')).toHaveLength(1);
});

test('DuplicateAction is disabled when user doesn\'t have correct permissions', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps({
        element: {
          BlockSchema: { type: 'Test' },
          canCreate: false
        }
      })}
      />
    </ElementEditorContext.Provider>
  );
  expect(container.querySelector('button.element-editor__actions-duplicate').disabled).toBe(true);
});

test('DuplicateAction does not render a button when block is broken', () => {
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
  expect(container.querySelectorAll('button.element-editor__actions-duplicate')).toHaveLength(0);
});

function setupTest() {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  const button = container.querySelector('button.element-editor__actions-duplicate');
  fireEvent.click(button);
}

test('DuplicateAction calls the duplicate endpoint', async () => {
  setupTest();
  resolveBackendPost();
  expect(lastBackendPostEndpoint).toBe('my/test/endpoint/api/duplicate');
  expect(lastBackendPostData).toEqual({
    id: 123,
  });
});

test('DuplicateAction reject known error', async () => {
  setupTest();
  rejectBackendPost(createJsonError('Cannot duplicate element'));
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe('Cannot duplicate element');
});

test('DuplicateAction reject unknown error', async () => {
  setupTest();
  rejectBackendPost();
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe('An unknown error has occurred.');
});
