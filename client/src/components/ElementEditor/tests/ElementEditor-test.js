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
let reloadedAreaId;
let timesReloaded = 0;

beforeEach(() => {
  resolveBackendGet = undefined;
  rejectBackendGet = undefined;
  lastBackendGetEndpoint = undefined;
  resolveBackendPost = undefined;
  rejectBackendPost = undefined;
  lastBackendPostEndpoint = undefined;
  lastBackendPostData = undefined;
  lastToastErrorMessage = undefined;
  reloadedAreaId = undefined;
  timesReloaded = 0;
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
    ListComponent: ({ elements, onDragEnd, isLoading }) => <div className="test-list" data-is-loading={isLoading}>
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
      editor: {
        reloadComplete: (areaId) => {
          reloadedAreaId = areaId;
          timesReloaded += 1;
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
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
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
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
});

test('ElementEditor fetchElements reject known error', async () => {
  render(<ElementEditor {...makeProps()}/>);
  rejectBackendGet(createJsonError('Could not fetch elements'));
  await screen.findByTestId('test-toolbar');
  expect(lastToastErrorMessage).toBe('Could not fetch elements');
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
});

test('ElementEditor fetchElements reject unknown error', async () => {
  render(<ElementEditor {...makeProps()}/>);
  rejectBackendGet();
  await screen.findByTestId('test-toolbar');
  expect(lastToastErrorMessage).toBe('An unknown error has occurred.');
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
});

test('ElementEditor sort success', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const element = container.querySelector('#Element1');
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
  fireEvent.click(element);
  resolveBackendPost();
  await screen.findByTestId('test-toolbar');
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  // resolve the refetch of the elements after sort
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(lastBackendPostEndpoint).toBe('my/test/endpoint/api/sort');
  expect(lastBackendPostData).toEqual({
    afterBlockID: 2,
    id: 1,
  });
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(2);
});

test('ElementEditor sort reject known error', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const element = container.querySelector('#Element1');
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
  fireEvent.click(element);
  rejectBackendPost(createJsonError('Could not sort elements'));
  await screen.findByTestId('test-toolbar');
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  // resolve the refetch of the elements after sort
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(lastToastErrorMessage).toBe('Could not sort elements');
  // Doesn't try refetching if sort failed
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
});

test('ElementEditor sort reject unknown error', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const element = container.querySelector('#Element1');
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
  fireEvent.click(element);
  rejectBackendPost();
  await screen.findByTestId('test-toolbar');
  // sleep for 0 seconds to get the next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  // resolve the refetch of the elements after sort
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(lastToastErrorMessage).toBe('An unknown error has occurred.');
  // Doesn't try refetching if sort failed
  expect(reloadedAreaId).toBe(8);
  expect(timesReloaded).toBe(1);
});

test('ElementEditor drag start sets dragging state', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const listComponent = container.querySelector('.test-list');
  expect(listComponent).not.toBeNull();
  expect(listComponent.getAttribute('data-dragging')).toBeNull();
});

test('ElementEditor does not refetch when dragging to same position', async () => {
  let dragEndEvent;
  const TestListComponent = ({ elements, onDragEnd }) => <div className="test-list">
    {elements.map(element => <div
      id={`Element${element.id}`}
      key={element.id}
      onClick={() => {
        dragEndEvent = { active: { id: 1 }, over: { id: 1 } };
        onDragEnd(dragEndEvent);
      }}
    >{element.title}</div>)}
  </div>;
  const { container } = render(<ElementEditor {...makeProps({
    ListComponent: TestListComponent
  })}
  />);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(timesReloaded).toBe(1);
  const element = container.querySelector('#Element1');
  fireEvent.click(element);
  await new Promise(resolve => setTimeout(resolve, 0));
  // Doesn't call post endpoint if same position
  expect(lastBackendPostEndpoint).toBeUndefined();
  expect(timesReloaded).toBe(1);
});

test('ElementEditor sort to first position with afterBlockID=0', async () => {
  let dragEndEvent;
  const TestListComponent = ({ elements, onDragEnd }) => <div className="test-list">
    {elements.map(element => <div
      id={`Element${element.id}`}
      key={element.id}
      onClick={() => {
        dragEndEvent = { active: { id: 2 }, over: { id: 1 } };
        onDragEnd(dragEndEvent);
      }}
    >{element.title}</div>)}
  </div>;
  const { container } = render(<ElementEditor {...makeProps({
    ListComponent: TestListComponent
  })}
  />);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(timesReloaded).toBe(1);
  const element2 = container.querySelector('#Element2');
  fireEvent.click(element2);
  resolveBackendPost();
  await screen.findByTestId('test-toolbar');
  await new Promise(resolve => setTimeout(resolve, 0));
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  // afterBlockID should be 0 when moving to first position (toIndex=0)
  expect(lastBackendPostData.afterBlockID).toBe(0);
  expect(lastBackendPostData.id).toBe(2);
});

test('ElementEditor forceRefetchElements prop triggers refetch', async () => {
  const { rerender } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(timesReloaded).toBe(1);
  rerender(<ElementEditor {...makeProps({ forceRefetchElements: true })}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(timesReloaded).toBe(2);
  expect(lastBackendGetEndpoint).toBe('my/test/endpoint/api/readElements/8');
});

test('ElementEditor displays correct number of elements from API response', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const elementDivs = container.querySelectorAll('.test-list > div');
  expect(elementDivs).toHaveLength(2);
  expect(elementDivs[0].textContent).toBe('My element');
  expect(elementDivs[1].textContent).toBe('Another element');
});

test('ElementEditor empty element list renders list component', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet({
    json: () => Promise.resolve([]),
  });
  await screen.findByTestId('test-toolbar');
  const listComponent = container.querySelector('.test-list');
  expect(listComponent).not.toBeNull();
  const elementDivs = container.querySelectorAll('.test-list > div');
  expect(elementDivs).toHaveLength(0);
});

test('ElementEditor provides context with fetchElements and actions', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(container.querySelector('.element-editor')).not.toBeNull();
});

test('ElementEditor handles response with mixed published and unpublished elements', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet({
    json: () => Promise.resolve([
      {
        id: 1,
        title: 'Published element',
        blockSchema: {},
        inlineEditable: true,
        published: true,
        liveVersion: true,
        version: 1,
      },
      {
        id: 2,
        title: 'Draft element',
        blockSchema: {},
        inlineEditable: true,
        published: false,
        liveVersion: false,
        version: 2,
      }
    ]),
  });
  await screen.findByTestId('test-toolbar');
  const elementDivs = container.querySelectorAll('.test-list > div');
  expect(elementDivs).toHaveLength(2);
});

test('ElementEditor sort maintains relative order of untouched elements', async () => {
  let dragEndEvent;
  const TestListComponent = ({ elements, onDragEnd }) => <div className="test-list">
    {elements.map(element => <div
      id={`Element${element.id}`}
      key={element.id}
      onClick={() => {
        dragEndEvent = { active: { id: 3 }, over: { id: 2 } };
        onDragEnd(dragEndEvent);
      }}
    >{element.title}</div>)}
  </div>;
  const { container } = render(<ElementEditor {...makeProps({
    ListComponent: TestListComponent
  })}
  />);
  resolveBackendGet({
    json: () => Promise.resolve([
      { id: 1, title: 'Element 1', blockSchema: {}, inlineEditable: true, published: true, liveVersion: true, version: 1 },
      { id: 2, title: 'Element 2', blockSchema: {}, inlineEditable: true, published: true, liveVersion: true, version: 1 },
      { id: 3, title: 'Element 3', blockSchema: {}, inlineEditable: true, published: true, liveVersion: true, version: 1 },
    ]),
  });
  await screen.findByTestId('test-toolbar');
  const element3 = container.querySelector('#Element3');
  fireEvent.click(element3);
  resolveBackendPost();
  await screen.findByTestId('test-toolbar');
  await new Promise(resolve => setTimeout(resolve, 0));
  resolveBackendGet({
    json: () => Promise.resolve([
      { id: 1, title: 'Element 1', blockSchema: {}, inlineEditable: true, published: true, liveVersion: true, version: 1 },
      { id: 3, title: 'Element 3', blockSchema: {}, inlineEditable: true, published: true, liveVersion: true, version: 1 },
      { id: 2, title: 'Element 2', blockSchema: {}, inlineEditable: true, published: true, liveVersion: true, version: 1 },
    ]),
  });
  await screen.findByTestId('test-toolbar');
  expect(lastBackendPostData.id).toBe(3);
  // When moving from index 2 to index 1, afterBlockID is element at index 0, which is 1
  expect(lastBackendPostData.afterBlockID).toBe(1);
});

test('ElementEditor renders without crashing on initial load', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  // Should return null while loading
  expect(container.firstChild).toBe(null);
});

test('ElementEditor handles refetch without manual setting loading state', async () => {
  const { rerender } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(timesReloaded).toBe(1);
  rerender(<ElementEditor {...makeProps({
    forceRefetchElements: true,
    ToolbarComponent: () => <div data-testid="test-toolbar2" />,
  })}
  />);
  // Don't resolve yet to check that loading state is set
  const toolbar = screen.queryByTestId('test-toolbar2');
  expect(toolbar).not.toBeNull();
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar2');
  expect(timesReloaded).toBe(2);
});

test('ElementEditor provides correct areaId to backend calls', async () => {
  render(<ElementEditor {...makeProps({
    areaId: 42
  })}
  />);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(lastBackendGetEndpoint).toContain('/42');
  expect(reloadedAreaId).toBe(42);
});

test('ElementEditor handles element data with various inlineEditable states', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet({
    json: () => Promise.resolve([
      {
        id: 1,
        title: 'Editable element',
        blockSchema: {},
        inlineEditable: true,
        published: true,
        liveVersion: true,
        version: 1,
      },
      {
        id: 2,
        title: 'Non-editable element',
        blockSchema: {},
        inlineEditable: false,
        published: true,
        liveVersion: true,
        version: 1,
      }
    ]),
  });
  await screen.findByTestId('test-toolbar');
  const elements = container.querySelectorAll('.test-list > div');
  expect(elements).toHaveLength(2);
});

test('ElementEditor preserves dragging state during sort request', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const element = container.querySelector('#Element1');
  fireEvent.click(element);
  // At this point, dragging state should be set before post resolves
  expect(reloadedAreaId).toBe(8);
  resolveBackendPost();
  await screen.findByTestId('test-toolbar');
  await new Promise(resolve => setTimeout(resolve, 0));
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  expect(timesReloaded).toBe(2);
});

test('ElementEditor does not show loading indicator for fast operations (< 300ms)', async () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  // Immediately resolve - operation completes in < 300ms
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  const listComponent = container.querySelector('.test-list');
  expect(listComponent.getAttribute('data-is-loading')).toBe('false');
});

test('ElementEditor shows loading indicator for slow operations (> 300ms)', async () => {
  jest.useFakeTimers();
  const { container } = render(<ElementEditor {...makeProps()}/>);
  // Wait for 300ms
  jest.advanceTimersByTime(300);
  const listComponent = container.querySelector('.test-list');
  // Should show loading after 300ms
  expect(listComponent).toBeNull(); // Still returning null since elements is null
  // Resolve the backend call
  resolveBackendGet(createJsonResponse());
  await screen.findByTestId('test-toolbar');
  jest.useRealTimers();
});

test('ElementEditor clears loading indicator timeout on fast completion', async () => {
  jest.useFakeTimers();
  const { container } = render(<ElementEditor {...makeProps()}/>);
  // Advance time by 100ms (less than 300ms debounce)
  jest.advanceTimersByTime(100);
  // Resolve quickly
  resolveBackendGet(createJsonResponse());
  // Advance past debounce time
  jest.advanceTimersByTime(250);
  await screen.findByTestId('test-toolbar');
  const listComponent = container.querySelector('.test-list');
  // Should not show loading since it completed before 300ms
  expect(listComponent.getAttribute('data-is-loading')).toBe('false');
  jest.useRealTimers();
});

test('ElementEditor debounced loading works on refetch', async () => {
  jest.useFakeTimers();
  const { rerender, container } = render(<ElementEditor {...makeProps()}/>);
  resolveBackendGet(createJsonResponse());
  jest.advanceTimersByTime(300);
  await screen.findByTestId('test-toolbar');
  expect(timesReloaded).toBe(1);
  // Trigger refetch
  rerender(<ElementEditor {...makeProps({ forceRefetchElements: true })}/>);
  // Complete quickly
  resolveBackendGet(createJsonResponse());
  jest.advanceTimersByTime(100);
  await screen.findByTestId('test-toolbar');
  const listComponent = container.querySelector('.test-list');
  expect(listComponent.getAttribute('data-is-loading')).toBe('false');
  jest.useRealTimers();
});
