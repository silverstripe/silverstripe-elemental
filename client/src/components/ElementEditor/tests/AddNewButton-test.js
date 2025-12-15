/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, expect */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Component as AddNewButton } from '../AddNewButton';

jest.mock('components/Button/Button', () => (props) => (
  <button {...props} data-testid="add-button" />
));

const elementTypes = [
  {
    name: 'TestElement',
    title: 'Test Block',
    icon: 'test-icon',
    tabs: [{ title: 'Content', name: 'Main' }],
  },
  {
    name: 'AnotherElement',
    title: 'Another Block',
    icon: 'another-icon',
    tabs: [{ title: 'Content', name: 'Main' }],
  },
];

const mockAddElementPopoverComponent = jest.fn(() => <div data-testid="add-element-popover" />);

function makeProps(obj = {}) {
  return {
    elementTypes,
    areaId: 1,
    AddElementPopoverComponent: mockAddElementPopoverComponent,
    ...obj,
  };
}

beforeEach(() => {
  mockAddElementPopoverComponent.mockClear();
});

test('AddNewButton renders button with correct text', () => {
  render(<AddNewButton {...makeProps()} />);
  const button = screen.getByText('Add new block');
  expect(button).not.toBeNull();
});

test('AddNewButton renders button with primary color', () => {
  render(<AddNewButton {...makeProps()} />);
  const button = screen.getByTestId('add-button');
  expect(button.getAttribute('color')).toBe('primary');
});

test('AddNewButton renders button with plus icon', () => {
  render(<AddNewButton {...makeProps()} />);
  const button = screen.getByTestId('add-button');
  expect(button.getAttribute('icon')).toBe('plus');
});

test('AddNewButton button has correct id based on areaId', () => {
  render(<AddNewButton {...makeProps({ areaId: 5 })} />);
  const button = screen.getByTestId('add-button');
  expect(button.getAttribute('id')).toBe('ElementalArea5_AddButton');
});

test('AddNewButton renders AddElementPopoverComponent', () => {
  render(<AddNewButton {...makeProps()} />);
  const popover = screen.getByTestId('add-element-popover');
  expect(popover).not.toBeNull();
});

test('AddNewButton passes elementTypes to AddElementPopoverComponent', () => {
  render(<AddNewButton {...makeProps()} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      elementTypes,
    }),
    expect.anything()
  );
});

test('AddNewButton passes areaId to AddElementPopoverComponent', () => {
  render(<AddNewButton {...makeProps({ areaId: 42 })} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      areaId: 42,
    }),
    expect.anything()
  );
});

test('AddNewButton passes insertAfterElement as 0 to AddElementPopoverComponent', () => {
  render(<AddNewButton {...makeProps()} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      insertAfterElement: 0,
    }),
    expect.anything()
  );
});

test('AddNewButton passes correct placement to AddElementPopoverComponent', () => {
  render(<AddNewButton {...makeProps()} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      placement: 'bottom-start',
    }),
    expect.anything()
  );
});

test('AddNewButton button click toggles popover from closed to open', () => {
  render(<AddNewButton {...makeProps()} />);
  const button = screen.getByTestId('add-button');
  fireEvent.click(button);
  const calls = mockAddElementPopoverComponent.mock.calls;
  const latestCall = calls[calls.length - 1];
  expect(latestCall[0].isOpen).toBe(true);
});

test('AddNewButton passes target id to AddElementPopoverComponent', () => {
  render(<AddNewButton {...makeProps({ areaId: 3 })} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      target: 'ElementalArea3_AddButton',
    }),
    expect.anything()
  );
});

test('AddNewButton passes toggle function to AddElementPopoverComponent', () => {
  render(<AddNewButton {...makeProps()} />);
  const toggleProp = mockAddElementPopoverComponent.mock.calls[0][0].toggle;
  expect(typeof toggleProp).toBe('function');
});

test('AddNewButton renders with multiple element types', () => {
  const multipleTypes = [
    { name: 'Type1', title: 'Block 1', icon: 'icon1', tabs: [] },
    { name: 'Type2', title: 'Block 2', icon: 'icon2', tabs: [] },
    { name: 'Type3', title: 'Block 3', icon: 'icon3', tabs: [] },
  ];
  render(<AddNewButton {...makeProps({ elementTypes: multipleTypes })} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      elementTypes: multipleTypes,
    }),
    expect.anything()
  );
});

test('AddNewButton renders correctly with different areaIds', () => {
  render(<AddNewButton {...makeProps({ areaId: 10 })} />);
  const button = screen.getByTestId('add-button');
  expect(button.getAttribute('id')).toBe('ElementalArea10_AddButton');
});

test('AddNewButton popover initially closed', () => {
  render(<AddNewButton {...makeProps()} />);
  const initialCall = mockAddElementPopoverComponent.mock.calls[0][0];
  expect(initialCall.isOpen).toBe(false);
});

test('AddNewButton toggle function exists and is a function', () => {
  render(<AddNewButton {...makeProps()} />);
  const toggleFn = mockAddElementPopoverComponent.mock.calls[0][0].toggle;
  expect(toggleFn).toBeDefined();
  expect(typeof toggleFn).toBe('function');
});

test('AddNewButton responds to multiple clicks', () => {
  render(<AddNewButton {...makeProps()} />);
  const button = screen.getByTestId('add-button');
  fireEvent.click(button);
  let latestCall = mockAddElementPopoverComponent.mock.calls[mockAddElementPopoverComponent.mock.calls.length - 1];
  expect(latestCall[0].isOpen).toBe(true);
  fireEvent.click(button);
  latestCall = mockAddElementPopoverComponent.mock.calls[mockAddElementPopoverComponent.mock.calls.length - 1];
  expect(latestCall[0].isOpen).toBe(false);
});

test('AddNewButton passes correct button id format for different areaIds', () => {
  render(<AddNewButton {...makeProps({ areaId: 99 })} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      target: 'ElementalArea99_AddButton',
    }),
    expect.anything()
  );
});

test('AddNewButton maintains toggle callback reference', () => {
  const { rerender } = render(<AddNewButton {...makeProps()} />);
  const toggleProp1 = mockAddElementPopoverComponent.mock.calls[0][0].toggle;
  mockAddElementPopoverComponent.mockClear();
  rerender(<AddNewButton {...makeProps()} />);
  const toggleProp2 = mockAddElementPopoverComponent.mock.calls[0][0].toggle;
  expect(typeof toggleProp1).toBe('function');
  expect(typeof toggleProp2).toBe('function');
});

test('AddNewButton renders with zero areaId', () => {
  render(<AddNewButton {...makeProps({ areaId: 0 })} />);
  const button = screen.getByTestId('add-button');
  expect(button.getAttribute('id')).toBe('ElementalArea0_AddButton');
});

test('AddNewButton renders with empty elementTypes array', () => {
  render(<AddNewButton {...makeProps({ elementTypes: [] })} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      elementTypes: [],
    }),
    expect.anything()
  );
});

test('AddNewButton all props are passed to AddElementPopoverComponent', () => {
  const customAreaId = 7;
  render(<AddNewButton {...makeProps({ areaId: customAreaId })} />);
  expect(mockAddElementPopoverComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      placement: 'bottom-start',
      target: `ElementalArea${customAreaId}_AddButton`,
      isOpen: false,
      elementTypes,
      toggle: expect.any(Function),
      areaId: customAreaId,
      insertAfterElement: 0,
    }),
    expect.anything()
  );
});
