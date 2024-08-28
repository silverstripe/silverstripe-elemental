/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect, window */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Component as UnpublishAction } from '../UnpublishAction';
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

function makeProps(obj = {}) {
  return {
    title: 'My unpublish action',
    element: {
      id: 123,
      isPublished: true,
      blockSchema: { type: 'Test' },
    },
    type: { title: 'Some block' },
    actions: {
      handleUnpublishBlock: () => {}
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

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = UnpublishAction(WrappedComponent);

test('UnpublishAction renders the title and class', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelector('button.element-editor__actions-unpublish').textContent).toBe('Unpublish');
});

test('UnpublishAction returns null when is not published', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps({
        element: {
          isPublished: false
        }
      })}
      />
    </ElementEditorContext.Provider>
  );
  expect(container.querySelectorAll('button')).toHaveLength(0);
});

test('UnpublishAction calls unpublish endpoint and fetchElements', async () => {
  let resolvePromise;
  const myPromise = new Promise((resolve) => {
    resolvePromise = resolve;
  });
  const fetchElements = jest.fn(() => {
    resolvePromise();
  });
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps({ fetchElements })}>
      <ActionComponent {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-unpublish'));
  resolveBackendPost();
  await Promise.all([myPromise]);
  expect(fetchElements).toHaveBeenCalled();
});

test('UnpublishAction is disabled when user doesn\'t have correct permissions', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps({
        element: {
          isPublished: true,
          canUnpublish: false
        }
      })}
      />
    </ElementEditorContext.Provider>
  );
  expect(container.querySelector('button.element-editor__actions-unpublish').disabled).toBe(true);
});

test('UnpublishAction does not render a button when block is broken', () => {
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
  expect(container.querySelectorAll('button.element-editor__actions-unpublish')).toHaveLength(0);
});

function setupEndpointTest() {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <ActionComponent {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  const button = container.querySelector('button.element-editor__actions-unpublish');
  fireEvent.click(button);
}

test('UnpublishAction calls the duplicate endpoint', async () => {
  setupEndpointTest();
  resolveBackendPost();
  expect(lastBackendPostEndpoint).toBe('my/test/endpoint/api/unpublish');
  expect(lastBackendPostData).toEqual({
    id: 123,
  });
});

test('UnpublishAction reject error', async () => {
  setupEndpointTest();
  rejectBackendPost();
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe("Error unpublishing 'Untitled Some block block'");
});
