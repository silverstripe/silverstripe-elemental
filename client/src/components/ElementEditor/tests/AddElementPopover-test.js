/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, expect */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Component as AddElementPopover } from '../AddElementPopover';
import { ElementEditorContext } from '../ElementEditor';

let resolveBackendPost;
let rejectBackendPost;
let lastBackendPostEndpoint;
let lastBackendPostData;
let lastToastErrorMessage;

jest.mock('lib/Backend', () => ({
  post: (endpoint, data) => new Promise((resolve, reject) => {
    resolveBackendPost = resolve;
    rejectBackendPost = reject;
    lastBackendPostEndpoint = endpoint;
    lastBackendPostData = data;
  }),
}));

beforeEach(() => {
  resolveBackendPost = undefined;
  rejectBackendPost = undefined;
  lastBackendPostEndpoint = undefined;
  lastBackendPostData = undefined;
  lastToastErrorMessage = undefined;
});

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

const elementTypes = [
  {
    name: 'TestElement',
    title: 'Test Block',
    class: 'Test\\Class\\TestElement',
    icon: 'nothing',
    tabs: [
      { title: 'Content', name: 'Main' },
      { title: 'History', name: 'History' }
    ],
  },
];

function makeProps(obj = {}) {
  return {
    container: () => <div className="test-container"/>,
    elementTypes,
    extraClass: '',
    isOpen: true,
    placement: '',
    target: 'target',
    toggle: () => null,
    areaId: 1,
    insertAfterElement: 2,
    actions: {
      toasts: {
        error: (message) => {
          lastToastErrorMessage = message;
        },
      }
    },
    PopoverOptionSetComponent: ({ buttons }) => <div className="test-popover-option-set">
      {buttons.map((button) => <button id={button.key} key={button.key} onClick={button.onClick}>{button.content}</button>)}
    </div>,
    ...obj,
  };
}

function makeProviderProps(obj = {}) {
  return {
    value: {
      fetchElements: () => [],
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

function setupTest() {
  const { container } = render(
    <ElementEditorContext.Provider {...makeProviderProps()}>
      <AddElementPopover {...makeProps()}/>
    </ElementEditorContext.Provider>
  );
  const button = container.querySelector('#TestElement');
  fireEvent.click(button);
}

test('AddElementPopover calls the create endpoint', async () => {
  setupTest();
  resolveBackendPost();
  expect(lastBackendPostEndpoint).toBe('my/test/endpoint/api/create');
  expect(lastBackendPostData).toEqual({
    elementClass: 'Test\\Class\\TestElement',
    elementalAreaID: 1,
    insertAfterElementID: 2,
  });
});

test('HistoryViewer reject known error', async () => {
  setupTest();
  rejectBackendPost(createJsonError('Cannot create element'));
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe('Cannot create element');
});

test('HistoryViewer reject unknown error', async () => {
  setupTest();
  rejectBackendPost();
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe('An unknown error has occurred.');
});
