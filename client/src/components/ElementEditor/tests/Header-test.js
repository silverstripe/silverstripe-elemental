/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Component as Header } from '../Header';

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
  expect(container.querySelectorAll('i.font-icon-block-file')).toHaveLength(1);
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

test('Header should override the title for broken elements', () => {
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
  const tooltip = await screen.findByRole('tooltip', {}, { timeout: 500, onTimeout: () => null });
  expect(tooltip.textContent).toBe('File');
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
  // Normally we would use "queryByRole" here because it does not throw an error on fail - but
  // in this case that provides a false negative result (confirmed by trying a timeout
  // with queryByRole in the "Header should not contain a Tooltip for a broken element" test
  // which causes that test to fail)
  const tooltip = await screen.findByRole('tooltip', {}, { timeout: 500, onTimeout: () => null });
  expect(tooltip).toBeNull();
});

test('Header should render a right caret button when not expandable', () => {
  const { container } = render(<Header {...makeProps({
    expandable: false
  })}
  />);
  expect(container.querySelectorAll('.element-editor-header__expand')).toHaveLength(1);
  expect(container.querySelector('.element-editor-header__expand').classList.contains('font-icon-right-open-big')).toBe(true);
});

test('Header should render a down caret button when not expanded', () => {
  const { container } = render(<Header {...makeProps({
    expandable: true,
    previewExpanded: false
  })}
  />);
  expect(container.querySelectorAll('.element-editor-header__expand')).toHaveLength(1);
  expect(container.querySelector('.element-editor-header__expand').classList.contains('font-icon-down-open-big')).toBe(true);
});

test('Header should render an up caret button when expanded', () => {
  const { container } = render(<Header {...makeProps({
    expandable: true,
    previewExpanded: true
  })}
  />);
  expect(container.querySelectorAll('.element-editor-header__expand')).toHaveLength(1);
  expect(container.querySelector('.element-editor-header__expand').classList.contains('font-icon-up-open-big')).toBe(true);
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
  expect(container.querySelectorAll('.element-editor-header__expand')).toHaveLength(0);
});

test('Header should render an ElementActions component when the element is expandable', () => {
  const { container } = render(<Header {...makeProps({
    expandable: true,
  })}
  />);
  expect(container.querySelectorAll('.test-element-actions')).toHaveLength(1);
});

test('Header should render an ElementActions component when the element is not expandable', () => {
  const { container } = render(<Header {...makeProps({
    expandable: false,
  })}
  />);
  expect(container.querySelectorAll('.test-element-actions')).toHaveLength(1);
});

test('Header should render an ElementActions component even when the element is broken', () => {
  const { container } = render(<Header {...makeProps({
    type: {
      broken: true,
      obsoleteClassName: 'RemovedClass'
    }
  })}
  />);
  expect(container.querySelectorAll('.test-element-actions')).toHaveLength(1);
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
  expect(container.querySelector('.element-editor-header__version-state.element-editor-header__version-state--draft').getAttribute('title')).toContain('not been published');
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
  expect(container.querySelector('.element-editor-header__version-state.element-editor-header__version-state--modified').getAttribute('title')).toContain('has unpublished changes');
});

test('Header should not render a versioned state message when the element is published', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: '14',
      isPublished: true,
      isLiveVersion: true
    }
  })}
  />);
  expect(container.querySelectorAll('.element-editor-header__version-state')).toHaveLength(0);
});

test('Header should render a versioned draft badge when the element is not published', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: '14',
      isPublished: false,
      liveVersion: false
    }
  })}
  />);
  expect(
    container
      .querySelector('.element-editor-header__info')
      .querySelector('.badge.status-addedtodraft')
      .getAttribute('title')
  ).toContain('Item has not been published yet');
});

test('Header should render a versioned modified badge when the element is modified and not published', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: '14',
      isPublished: true,
      isLiveVersion: false
    }
  })}
  />);
  expect(
    container
      .querySelector('.element-editor-header__info')
      .querySelector('.badge.status-modified')
      .getAttribute('title')
  ).toContain('Item has unpublished changes');
});
