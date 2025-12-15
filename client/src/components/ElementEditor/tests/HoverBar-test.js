/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Component as HoverBar } from '../HoverBar';

function makeProps(obj = {}) {
  return {
    key: 0,
    areaId: 0,
    elementId: 0,
    elementTypes: [
      {
        name: 'Main',
        title: 'Content',
        icon: '',
        tabs: ['', '']
      }
    ],
    AddElementPopoverComponent: () => <div />,
    ...obj
  };
}

const hoverBarName = 'AddBlockHoverBar';
const hoverBarAreaName = 'AddBlockHoverBarArea';

test('HoverBar renders top HoverBarComponent', () => {
  [
    { areaId: 1, elementId: 0 },
    { areaId: 2, elementId: 3 },
  ].forEach(({ areaId, elementId }) => {
    const { container } = render(
      <HoverBar {...makeProps({
        areaId,
        elementId,
        key: elementId
      })}
      />
    );
    const hoverBar = container.querySelector('.element-editor__hover-bar');
    const hoverBarArea = container.querySelector('button.element-editor__hover-bar-area');
    expect(hoverBar.getAttribute('id')).toBe(`${hoverBarName}_${areaId}_${elementId}`);
    expect(hoverBarArea.getAttribute('id')).toBe(`${hoverBarAreaName}_${areaId}_${elementId}`);
  });
});

test('HoverBar button has accessibility attributes', () => {
  const { container } = render(
    <HoverBar {...makeProps({
      areaId: 5,
      elementId: 10
    })}
    />
  );
  const button = container.querySelector('button.element-editor__hover-bar-area');
  expect(button.getAttribute('aria-label')).toBe('Add new block');
  expect(button.getAttribute('title')).toBe('Add new block');
});

test('HoverBar renders icon with aria-hidden', () => {
  const { container } = render(
    <HoverBar {...makeProps()} />
  );
  const icon = container.querySelector('.element-editor__hover-bar-line');
  expect(icon).not.toBeNull();
  expect(icon.classList.contains('font-icon-plus-circled')).toBe(true);
  expect(icon.getAttribute('aria-hidden')).toBe('true');
});

test('HoverBar button toggles popover open state on click', () => {
  const mockAddElementPopover = jest.fn(() => <div />);
  const { container, rerender } = render(
    <HoverBar {...makeProps({
      AddElementPopoverComponent: mockAddElementPopover,
      areaId: 1,
      elementId: 1
    })}
    />
  );
  const button = container.querySelector('button.element-editor__hover-bar-area');

  // Check initial state (popover closed)
  expect(button.classList.contains('element-editor__hover-bar-area--focus')).toBe(false);

  // Click button to open
  fireEvent.click(button);
  rerender(
    <HoverBar {...makeProps({
      AddElementPopoverComponent: mockAddElementPopover,
      areaId: 1,
      elementId: 1
    })}
    />
  );

  // Check if focus class is applied when popover is open
  const updatedButton = container.querySelector('button.element-editor__hover-bar-area');
  expect(updatedButton.classList.contains('element-editor__hover-bar-area--focus')).toBe(true);
});

test('HoverBar button structure contains correct elements', () => {
  const { container } = render(
    <HoverBar {...makeProps({
      areaId: 2,
      elementId: 5
    })}
    />
  );
  const button = container.querySelector('button.element-editor__hover-bar-area');
  const areaInner = button.querySelector('.element-editor__hover-bar-area-inner');
  const line = areaInner.querySelector('.element-editor__hover-bar-line');

  expect(button).not.toBeNull();
  expect(areaInner).not.toBeNull();
  expect(line).not.toBeNull();
});

test('HoverBar passes correct props to AddElementPopoverComponent', () => {
  const mockAddElementPopover = jest.fn(() => <div />);
  render(
    <HoverBar {...makeProps({
      AddElementPopoverComponent: mockAddElementPopover,
      areaId: 3,
      elementId: 7,
      elementTypes: [
        {
          name: 'Text',
          title: 'Text Block',
          icon: 'text-icon',
          tabs: ['tab1']
        }
      ]
    })}
    />
  );

  const callArgs = mockAddElementPopover.mock.calls[0][0];
  expect(callArgs.placement).toBe('bottom');
  expect(callArgs.target).toBe('AddBlockHoverBarArea_3_7');
  expect(callArgs.container).toBe('#AddBlockHoverBar_3_7');
  expect(callArgs.areaId).toBe(3);
  expect(callArgs.insertAfterElement).toBe(7);
  expect(callArgs.isOpen).toBe(false);
  expect(Array.isArray(callArgs.elementTypes)).toBe(true);
  expect(callArgs.elementTypes.length).toBe(1);
});

test('HoverBar passes isOpen prop to AddElementPopoverComponent with correct state', () => {
  const mockAddElementPopover = jest.fn(() => <div />);
  const { container, rerender } = render(
    <HoverBar {...makeProps({
      AddElementPopoverComponent: mockAddElementPopover,
      areaId: 4,
      elementId: 8
    })}
    />
  );

  let callArgs = mockAddElementPopover.mock.calls[mockAddElementPopover.mock.calls.length - 1][0];
  expect(callArgs.isOpen).toBe(false);

  // Click to toggle
  const button = container.querySelector('button.element-editor__hover-bar-area');
  fireEvent.click(button);

  rerender(
    <HoverBar {...makeProps({
      AddElementPopoverComponent: mockAddElementPopover,
      areaId: 4,
      elementId: 8
    })}
    />
  );

  callArgs = mockAddElementPopover.mock.calls[mockAddElementPopover.mock.calls.length - 1][0];
  expect(callArgs.isOpen).toBe(true);
});

test('HoverBar creates unique IDs based on areaId and elementId', () => {
  const { container: container1 } = render(
    <HoverBar {...makeProps({
      areaId: 10,
      elementId: 20
    })}
    />
  );
  const id1 = container1.querySelector('.element-editor__hover-bar').getAttribute('id');
  const buttonId1 = container1.querySelector('button.element-editor__hover-bar-area').getAttribute('id');

  expect(id1).toBe('AddBlockHoverBar_10_20');
  expect(buttonId1).toBe('AddBlockHoverBarArea_10_20');

  const { container: container2 } = render(
    <HoverBar {...makeProps({
      areaId: 15,
      elementId: 25
    })}
    />
  );
  const id2 = container2.querySelector('.element-editor__hover-bar').getAttribute('id');
  const buttonId2 = container2.querySelector('button.element-editor__hover-bar-area').getAttribute('id');

  expect(id2).toBe('AddBlockHoverBar_15_25');
  expect(buttonId2).toBe('AddBlockHoverBarArea_15_25');
  expect(id1).not.toBe(id2);
  expect(buttonId1).not.toBe(buttonId2);
});
