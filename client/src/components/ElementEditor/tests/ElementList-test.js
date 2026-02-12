/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect, beforeEach, afterEach */

import React from 'react';
import { render } from '@testing-library/react';
import { KeyboardCode } from '@dnd-kit/core';
import { Component as ElementList, keyboardCoordinateGetter } from '../ElementList';

// Mock console methods to verify no errors/warnings during DndContext setup
// eslint-disable-next-line no-console
const originalConsoleError = console.error;
// eslint-disable-next-line no-console
const originalConsoleWarn = console.warn;
let consoleErrors = [];
let consoleWarnings = [];

beforeEach(() => {
  consoleErrors = [];
  consoleWarnings = [];
  // eslint-disable-next-line no-console
  console.error = jest.fn((message) => {
    consoleErrors.push(message);
  });
  // eslint-disable-next-line no-console
  console.warn = jest.fn((message) => {
    consoleWarnings.push(message);
  });
});

afterEach(() => {
  // eslint-disable-next-line no-console
  console.error = originalConsoleError;
  // eslint-disable-next-line no-console
  console.warn = originalConsoleWarn;
});

const elementTypes = [
  {
    name: 'Main',
    title: 'Content',
    icon: '',
    tabs: ['', '']
  }
];

function makeProps(obj = {}) {
  return {
    key: '1',
    elements: [
      {
        id: 1,
        title: 'Title',
        blockSchema: {
          actions: { edit: '' }
        },
        inlineEditable: true,
        published: true,
        liveVersion: true,
        version: 6
      },
      {
        id: 2,
        title: 'Title II',
        blockSchema: {
          actions: { edit: '' }
        },
        inlineEditable: true,
        published: false,
        liveVersion: false,
        version: 2
      },
    ],
    allowedElementTypes: elementTypes,
    elementTypes,
    ElementComponent: () => <div className="test-element" />,
    LoadingComponent: () => <div className="test-loading" />,
    HoverBarComponent: () => <div className="test-hover-bar" />,
    loading: false,
    areaId: 1,
    connectDropTarget: (content) => content,
    ...obj,
  };
}

test('ElementList renders elements with keyboard sensor support', () => {
  const { container } = render(<ElementList {...makeProps()}/>);
  expect(container.querySelectorAll('.test-element')).toHaveLength(2);
  expect(container.querySelectorAll('.test-loading')).toHaveLength(0);
});

test('ElementList renders a loading component', () => {
  const { container } = render(
    <ElementList {...makeProps({
      key: '2',
      elements: [],
      isLoading: true
    })}
    />
  );
  expect(container.querySelectorAll('.test-element')).toHaveLength(0);
  expect(container.querySelectorAll('.test-loading')).toHaveLength(1);
});

test('ElementList renders a placeholder message when no elements are provided as props', () => {
  const { container } = render(
    <ElementList {...makeProps({
      key: '3',
      elements: [],
      isLoading: false
    })}
    />
  );
  expect(container.querySelectorAll('.test-element')).toHaveLength(0);
  expect(container.querySelectorAll('.test-loading')).toHaveLength(0);
  const placeholder = container.querySelector('.elemental-editor-list--empty');
  expect(placeholder.textContent).toBe('Add blocks to place your content');
});

test('ElementList renders DndContext with SortableContext setup for elements', () => {
  const { container } = render(<ElementList {...makeProps()}/>);
  expect(container.querySelectorAll('.test-element')).toHaveLength(2);
  expect(consoleErrors).toHaveLength(0);
  expect(consoleWarnings).toHaveLength(0);
});

test('ElementList renders elements without accessibility warnings from dnd-kit', () => {
  render(<ElementList {...makeProps()}/>);
  const a11yWarnings = consoleWarnings.filter(msg =>
    typeof msg === 'string' && (
      msg.toLowerCase().includes('accessibility') ||
      msg.toLowerCase().includes('aria') ||
      msg.toLowerCase().includes('role')
    )
  );
  expect(a11yWarnings).toHaveLength(0);
});

test('ElementList configures DndContext with KeyboardSensor for keyboard sorting', () => {
  const { container } = render(<ElementList {...makeProps()}/>);
  expect(container.querySelectorAll('.test-element')).toHaveLength(2);
  expect(consoleErrors).toHaveLength(0);
  const dndContextErrors = consoleErrors.filter(msg =>
    typeof msg === 'string' && (
      msg.includes('DndContext') ||
      msg.includes('useSensor') ||
      msg.includes('KeyboardSensor')
    )
  );
  expect(dndContextErrors).toHaveLength(0);
});

test('keyboardCoordinateGetter returns undefined when indexes are missing', () => {
  const event = {
    code: KeyboardCode.Down,
    preventDefault: jest.fn(),
  };
  const args = {
    context: {
      active: {
        id: 3,
        data: {
          current: {
            sortable: {
              items: [1, 2],
            },
          },
        },
      },
      over: { id: 2 },
      droppableContainers: new Map(),
    },
  };
  let result;
  expect(() => {
    result = keyboardCoordinateGetter(event, args);
  }).not.toThrow();
  expect(result).toBeUndefined();
});

test('keyboardCoordinateGetter returns undefined when droppable containers are missing', () => {
  const event = {
    code: KeyboardCode.Down,
    preventDefault: jest.fn(),
  };
  const droppableContainers = new Map([
    [1, { node: { current: { getBoundingClientRect: () => ({ top: 0, bottom: 10, height: 10 }) } } }],
  ]);
  const args = {
    context: {
      active: {
        id: 1,
        data: {
          current: {
            sortable: {
              items: [1, 2],
            },
          },
        },
      },
      over: null,
      droppableContainers,
    },
  };
  let result;
  expect(() => {
    result = keyboardCoordinateGetter(event, args);
  }).not.toThrow();
  expect(result).toBeUndefined();
});

test('keyboardCoordinateGetter returns undefined when node refs are missing', () => {
  const event = {
    code: KeyboardCode.Down,
    preventDefault: jest.fn(),
  };
  const droppableContainers = new Map([
    [1, { node: { current: null } }],
    [2, { node: { current: null } }],
  ]);
  const args = {
    context: {
      active: {
        id: 1,
        data: {
          current: {
            sortable: {
              items: [1, 2],
            },
          },
        },
      },
      over: null,
      droppableContainers,
    },
  };
  let result;
  expect(() => {
    result = keyboardCoordinateGetter(event, args);
  }).not.toThrow();
  expect(result).toBeUndefined();
});
