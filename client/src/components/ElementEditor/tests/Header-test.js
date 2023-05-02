/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { Component as Header } from '../Header';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Fixes issue when rendering reactstrap tooltip
// Warning: `NaN` is an invalid value for the `left` css style property.
// https://stackoverflow.com/a/70157330
// Have refactored to not use an anonymous class with a static property being assigned
// so that it passed eslint
jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');
  return {
    __esModule: true,
    default: jest.fn(() => ({
      placements: PopperJS.placements,
      destroy: () => {},
      scheduleUpdate: () => {},
    })),
  };
});

function makeProps(obj = {}) {
  return {
    element: {
      id: '0',
      title: 'Sample File Block',
    },
    areaId: 1,
    type: {
      inlineEditable: true,
      title: 'File',
      icon: 'font-icon-block-file',
      editTabs: [
        { name: 'content', title: 'Content' },
        { name: 'settings', title: 'Settings' },
        { name: 'history', title: 'History' },
      ],
    },
    ElementActionsComponent: () => <div className="test-element-actions" />,
    connectDragSource: (content) => content,
    connectDragPreview: (content) => content,
    onDragEnd: () => null,
    ...obj,
  };
}

test('Header should render the icon', () => {
  const { container } = render(<Header {...makeProps()}/>);
  expect(container.querySelector('i.font-icon-block-file')).not.toBeNull();
});

test('Header should render the title', () => {
  const { container } = render(
    <Header {...makeProps({
      element: {
        id: '12',
        title: 'Sample File Block'
      }
    })}
    />
  );
  expect(container.querySelector('.element-editor-header__title').textContent).toBe('Sample File Block');
});

test('Header should render the title for broken elements', () => {
  const { container } = render(
    <Header {...makeProps({
      type: {
        broken: true,
        obsoleteClassName: 'RemovedClass'
      }
    })}
    />
  );
  expect(container.querySelector('.element-editor-header__title').textContent).toBe('This element is of obsolete type RemovedClass.');
});

test('Header should contain a Tooltip', async () => {
  const { container } = render(
    <Header {...makeProps({
      element: {
        id: '13',
        title: 'Sample File Block',
      }
    })}
    />
  );
  fireEvent.mouseOver(container.querySelector('#element-icon-13.font-icon-block-file'));
  const tooltip = await screen.findByText('File');
  expect(tooltip.getAttribute('role')).toBe('tooltip');
});

test('Header should not contain a Tooltip for a broken element', async () => {
  const { container } = render(
    <Header {...makeProps({
      element: {
        id: '13',
        title: 'Sample File Block',
      },
      type: {
        broken: true,
        obsoleteClassName: 'RemovedClass'
      }
    })}
    />
  );
  fireEvent.mouseOver(container.querySelector('#element-icon-13'));
  // wait for 500 milliseconds for the tooltip to appear (which is should not)
  // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
  await waitFor(() => null, { timeout: 500 });
  // use "queryBy" because it does not throw an error on fail - https://testing-library.com/docs/queries/about
  expect(screen.queryByText('File')).toBeNull();
});

test('Header should render a right caret button when not expandable', () => {
  const { container } = render(<Header {...makeProps({
    expandable: false
  })}
  />);
  expect(container.querySelector('.element-editor-header__expand.font-icon-right-open-big')).not.toBeNull();
});

test('Header should render a down caret button when not expanded', () => {
  const { container } = render(<Header {...makeProps({
    expandable: true,
    previewExpanded: false
  })}
  />);
  expect(container.querySelector('.element-editor-header__expand.font-icon-down-open-big')).not.toBeNull();
});

test('Header should render an up caret button when expanded', () => {
  const { container } = render(<Header {...makeProps({
    expandable: true,
    previewExpanded: true
  })}
  />);
  expect(container.querySelector('.element-editor-header__expand.font-icon-up-open-big')).not.toBeNull();
});

test('Header should not render a caret button for a broken element', () => {
  const { container } = render(<Header {...makeProps({
    expandable: false,
    type: {
      broken: true,
      obsoleteClassName: 'RemovedClass'
    }
  })}
  />);
  expect(container.querySelector('.element-editor-header__expand')).toBeNull();
});

test('Header should render an ElementActions component when the element is expandable', () => {
  const { container } = render(<Header {...makeProps({
    expandable: true,
  })}
  />);
  expect(container.querySelector('.test-element-actions')).not.toBeNull();
});

test('Header should render an ElementActions component when the element is not expandable', () => {
  const { container } = render(<Header {...makeProps({
    expandable: false,
  })}
  />);
  expect(container.querySelector('.test-element-actions')).not.toBeNull();
});

test('Header should render an ElementActions component even when the element is broken', () => {
  const { container } = render(<Header {...makeProps({
    type: {
      broken: true,
      obsoleteClassName: 'RemovedClass'
    }
  })}
  />);
  expect(container.querySelector('.test-element-actions')).not.toBeNull();
});

test('Header should render a versioned state message when the element is not published', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: '14',
      isPublished: false,
      liveVersion: false
    }
  })}
  />);
  expect(container.querySelector('.element-editor-header__version-state--draft').getAttribute('title')).toContain('not been published');
});

test('Header should render a versioned state message when the element is modified', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: '14',
      isPublished: true,
      isLiveVersion: false
    }
  })}
  />);
  expect(container.querySelector('.element-editor-header__version-state--modified').getAttribute('title')).toContain('has unpublished changes');
});

test('Header should render a versioned state message when the element is published', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: '14',
      isPublished: true,
      isLiveVersion: true
    }
  })}
  />);
  expect(container.querySelector('.element-editor-header__version-state')).toBeNull();
});
