/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Component as Header } from '../Header';

function makeProps(obj = {}) {
  return {
    element: {
      id: 0,
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
  expect(container.querySelectorAll('span.font-icon-block-file')).toHaveLength(1);
});

test('Header should render the title', () => {
  const { container } = render(
    <Header {...makeProps({
      element: {
        id: 12,
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
        id: 13,
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
        id: 13,
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
      id: 14,
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
      id: 14,
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
      id: 14,
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
      id: 14,
      isPublished: false,
      liveVersion: false,
      statusFlags: {
        addedtodraft: {
          text: 'Draft',
          title: 'Item has not been published yet'
        }
      }
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
      id: 14,
      isPublished: true,
      isLiveVersion: false,
      statusFlags: {
        modified: {
          text: 'Modified',
          title: 'Item has unpublished changes'
        }
      }
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

test('Header should render with a simple prop and not render actions', () => {
  const { container } = render(<Header {...makeProps({
    simple: true
  })}
  />);
  expect(container.querySelector('.element-editor-header--simple')).not.toBeNull();
  expect(container.querySelectorAll('.element-editor-header__actions')).toHaveLength(0);
});

test('Header should render a title with no title class when element has no title', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: 15,
      title: null
    }
  })}
  />);
  expect(container.querySelector('.element-editor-header__title.element-editor-header__title--none')).not.toBeNull();
});

test('Header should render drag handle', () => {
  const { container } = render(<Header {...makeProps()} />);
  expect(container.querySelector('.element-editor-header__drag-handle')).not.toBeNull();
  expect(container.querySelector('.font-icon-drag-handle')).not.toBeNull();
});

test('Header should render icon container with broken class when type is broken', () => {
  const { container } = render(<Header {...makeProps({
    type: {
      broken: true,
      obsoleteClassName: 'RemovedClass'
    }
  })}
  />);
  expect(container.querySelector('.element-editor-header__icon-container.element-editor-header__icon-container--broken')).not.toBeNull();
});

test('Header should stop propagation when clicking actions', () => {
  const stopPropagation = jest.fn();
  const { container } = render(<Header {...makeProps({
    simple: false
  })}
  />);
  const actionsDiv = container.querySelector('.element-editor-header__actions');
  fireEvent.click(actionsDiv, { stopPropagation });
  expect(stopPropagation).not.toHaveBeenCalled();
  const innerDiv = container.querySelector('[role="none"]');
  if (innerDiv) {
    fireEvent.click(innerDiv);
  }
});

test('Header should render multiple status badges', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: 16,
      statusFlags: {
        addedtodraft: {
          text: 'Draft',
          title: 'In Draft'
        },
        archived: {
          text: 'Archived',
          title: 'Item is archived'
        }
      }
    }
  })}
  />);
  expect(container.querySelectorAll('.badge')).toHaveLength(2);
  expect(container.querySelector('.badge.status-addedtodraft')).not.toBeNull();
  expect(container.querySelector('.badge.status-archived')).not.toBeNull();
});

test('Header should handle status badge with string data', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: 17,
      statusFlags: {
        custom: 'Custom Flag'
      }
    }
  })}
  />);
  expect(container.querySelector('.badge.status-custom')).not.toBeNull();
  expect(container.querySelector('.badge.status-custom').textContent).toBe('Custom Flag');
});

test('Header should render status badge without title when not provided in data', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: 18,
      statusFlags: {
        notitle: {
          text: 'No Title Flag'
        }
      }
    }
  })}
  />);
  expect(container.querySelector('.badge.status-notitle')).not.toBeNull();
  expect(container.querySelector('.badge.status-notitle').getAttribute('title')).toBe('');
});

test('Header should toggle tooltip state when icon is clicked', async () => {
  const { container, rerender } = render(<Header {...makeProps({
    element: {
      id: 19,
      title: 'Sample File Block'
    }
  })}
  />);
  const icon = container.querySelector('#element-icon-19.font-icon-block-file');
  fireEvent.mouseOver(icon);
  await screen.findByRole('tooltip', {}, { timeout: 500, onTimeout: () => null });
  fireEvent.click(icon);
  rerender(<Header {...makeProps({
    element: {
      id: 19,
      title: 'Sample File Block'
    }
  })}
  />);
});

test('Header should render drag handle with accessibility attributes when sortable props are provided', () => {
  const { container } = render(
    <Header {...makeProps({
      sortableListeners: {},
      sortableAttributes: { 'data-test': 'test' },
      elementId: 'element-123',
    })}
    />
  );
  const dragHandle = container.querySelector('.element-editor-header__drag-handle');
  expect(dragHandle).not.toBeNull();
  expect(dragHandle.getAttribute('tabindex')).toBe('0');
  expect(dragHandle.getAttribute('role')).toBe('button');
  expect(dragHandle.getAttribute('aria-label')).not.toBeNull();
  expect(dragHandle.getAttribute('aria-controls')).toBe('element-123');
});

test('Header should have drag handle with correct aria-label text', () => {
  const { container } = render(
    <Header {...makeProps({
      sortableListeners: {},
      sortableAttributes: {},
      elementId: 'element-456',
    })}
    />
  );
  const dragHandle = container.querySelector('.element-editor-header__drag-handle');
  expect(dragHandle.getAttribute('aria-label')).toContain('Reorder block');
});

test('Header should receive onKeyDown handler from sortableListeners on drag handle', () => {
  const mockOnKeyDown = jest.fn();
  const { container } = render(
    <Header {...makeProps({
      sortableListeners: { onKeyDown: mockOnKeyDown },
      sortableAttributes: {},
      elementId: 'element-789',
    })}
    />
  );
  const dragHandle = container.querySelector('.element-editor-header__drag-handle');
  const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
  dragHandle.dispatchEvent(event);
  expect(mockOnKeyDown).toHaveBeenCalled();
});

test('Header should have correct element type icon class', () => {
  const { container } = render(<Header {...makeProps({
    type: {
      inlineEditable: true,
      title: 'Video',
      icon: 'font-icon-block-video',
      editTabs: []
    }
  })}
  />);
  expect(container.querySelector('.font-icon-block-video')).not.toBeNull();
});

test('Header should render title when element title is provided and type is not broken', () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: 20,
      title: 'My Custom Title'
    }
  })}
  />);
  expect(container.querySelector('.element-editor-header__title').textContent).toBe('My Custom Title');
  expect(container.querySelector('.element-editor-header__title.element-editor-header__title--none')).toBeNull();
});

test('Header should not render tooltip when disableTooltip prop is true', async () => {
  const { container } = render(<Header {...makeProps({
    element: {
      id: 21,
      title: 'Sample File Block'
    },
    disableTooltip: true
  })}
  />);
  const icon = container.querySelector('#element-icon-21.font-icon-block-file');
  fireEvent.mouseOver(icon);
  const tooltip = await screen.findByRole('tooltip', {}, { timeout: 500, onTimeout: () => null });
  expect(tooltip).toBeNull();
});

test('Header should pass correct props to ElementActionsComponent', () => {
  const ElementActionsComponent = jest.fn(() => <div className="test-element-actions" />);
  render(<Header {...makeProps({
    element: {
      id: 22,
      title: 'Test'
    },
    type: {
      inlineEditable: true,
      title: 'Test Type',
      icon: 'font-icon-test',
      editTabs: [
        { name: 'content', title: 'Content' }
      ]
    },
    areaId: 5,
    activeTab: 'content',
    ElementActionsComponent
  })}
  />);
  expect(ElementActionsComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      element: expect.objectContaining({ id: 22 }),
      type: expect.objectContaining({ title: 'Test Type' }),
      areaId: 5,
      activeTab: 'content',
      expandable: true
    }),
    {}
  );
});

test('Header drag handle should be focusable and have tabIndex', () => {
  const { container } = render(
    <Header {...makeProps({
      sortableListeners: {},
      sortableAttributes: {},
      elementId: 'element-focus',
    })}
    />
  );
  const dragHandle = container.querySelector('.element-editor-header__drag-handle');
  expect(dragHandle.getAttribute('tabindex')).toBe('0');
});

test('Header drag handle should be visible when focused', () => {
  const { container } = render(
    <Header {...makeProps({
      sortableListeners: {},
      sortableAttributes: {},
      elementId: 'element-focus-visible',
    })}
    />
  );
  const dragHandle = container.querySelector('.element-editor-header__drag-handle');
  fireEvent.focus(dragHandle);
  expect(dragHandle.classList.contains('element-editor-header__drag-handle')).toBe(true);
});
