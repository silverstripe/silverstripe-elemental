/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Component as ElementEditor } from '../ElementEditor';

let resolveBackendGet;
let rejectBackendGet;
let lastBackendGetEndpoint;
let resolveBackendPost;
let rejectBackendPost;
let lastBackendPostEndpoint;
let lastBackendPostData;
let lastToastErrorMessage;

beforeEach(() => {
  resolveBackendGet = undefined;
  rejectBackendGet = undefined;
  lastBackendGetEndpoint = undefined;
  resolveBackendPost = undefined;
  rejectBackendPost = undefined;
  lastBackendPostEndpoint = undefined;
  lastBackendPostData = undefined;
  lastToastErrorMessage = undefined;
});

jest.mock('lib/Backend', () => ({
  get: (endpoint) => new Promise((resolve, reject) => {
    lastBackendGetEndpoint = endpoint;
    resolveBackendGet = resolve;
    rejectBackendGet = reject;
  }),
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

function createJsonResponse() {
  return {
    json: () => Promise.resolve([
      {
        id: 1,
        title: 'My element',
        blockSchema: {},
        inlineEditable: true,
        published: true,
        liveVersion: true,
        version: 1,
      },
      {
        id: 2,
        title: 'Another element',
        blockSchema: {},
        inlineEditable: true,
        published: true,
        liveVersion: true,
        version: 1,
      }
    ]),
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

const jQuery = jest.fn();
window.jQuery = jQuery;

const mockEvent = {
  active: { id: 1 },
  over: { id: 2 },
};

function makeProps(obj = {}) {
  return {
    ToolbarComponent: ({ elementTypes }) => <div data-testid="test-toolbar" data-elementtypes={elementTypes.map(type => type.class).join(',')} />,
    ListComponent: ({ elements, onDragEnd }) => <div className="test-list">
      {elements.map(element => <div id={`Element${element.id}`} key={element.id} onClick={() => onDragEnd(mockEvent)}>{element.title}</div>)}
    </div>,
    areaId: 8,
    elementTypes: [
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
      {
        name: 'Aye',
        title: 'Aye',
        class: 'Test\\Class\\Aye',
        icon: 'nothing',
        tabs: [
          { title: 'Content', name: 'Main' },
          { title: 'History', name: 'History' }
        ],
      },
      {
        name: 'Bee',
        title: 'Bee',
        class: 'Test\\Class\\Bee',
        icon: 'nothing',
        tabs: [
          { title: 'Content', name: 'Main' },
          { title: 'History', name: 'History' }
        ],
      },
    ],
    allowedElements: [
      'Test\\Class\\Aye',
      'Test\\Class\\Bee',
      'Test\\Class\\TestElement'
    ],
    elementalAreaId: 1,
    connectDropTarget: (content) => content,
    actions: {
      toasts: {
        error: (message) => {
          lastToastErrorMessage = message;
        }
      },
    },
    ...obj,
  };
}

test('ElementEditor should render ElementList and Toolbar', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(container.querySelectorAll('.test-list')).toHaveLength(1);
  expect(container.querySelectorAll('[data-testid="test-toolbar"]')).toHaveLength(1);
});

test('ElementEditor should filter all element types by those allowed for this editor', async () => {
  render(
    <ElementEditor {...makeProps({
      allowedElements: ['Test\\Class\\Aye']
    })}
    />
  );
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(screen.getByTestId('test-toolbar').getAttribute('data-elementtypes')).toBe('Test\\Class\\Aye');
});

test('ElementEditor should retain the order specified by the allowed elements config', async () => {
  render(
    <ElementEditor {...makeProps({
      allowedElements: ['Test\\Class\\Bee', 'Test\\Class\\TestElement']
    })}
    />
  );
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(screen.getByTestId('test-toolbar').getAttribute('data-elementtypes')).toBe('Test\\Class\\Bee,Test\\Class\\TestElement');
});

test('ElementEditor fetchElements success', async () => {
  render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(lastBackendGetEndpoint).toBe('my/test/endpoint/api/readElements/8');
});

test('ElementEditor fetchElements reject known error', async () => {
  render(<ElementEditor {...makeProps()}/>);
  rejectBackendGet(createJsonError('Could not fetch elements'));
  await screen.findByTestId('test-toolbar');
  expect(lastToastErrorMessage).toBe('Could not fetch elements');
});

test('ElementEditor fetchElements reject unknown error', async () => {
  render(<ElementEditor {...makeProps()}/>);
  rejectBackendGet();
  await screen.findByTestId('test-toolbar');
  expect(lastToastErrorMessage).toBe('An unknown error has occurred.');
});

test('ElementEditor sort success', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const element = container.querySelector('#Element1');
  fireEvent.click(element);
  resolveBackendPost();
  // resolve the refetch of the elements after sort
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastBackendPostEndpoint).toBe('my/test/endpoint/api/sort');
  expect(lastBackendPostData).toEqual({
    afterBlockID: 2,
    id: 1,
  });
});

test('ElementEditor sort reject known error', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const element = container.querySelector('#Element1');
  fireEvent.click(element);
  rejectBackendPost(createJsonError('Could not sort elements'));
  // resolve the refetch of the elements after sort
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe('Could not sort elements');
});

test('ElementEditor sort reject unknown error', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const element = container.querySelector('#Element1');
  fireEvent.click(element);
  rejectBackendPost();
  // resolve the refetch of the elements after sort
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(lastToastErrorMessage).toBe('An unknown error has occurred.');
});
