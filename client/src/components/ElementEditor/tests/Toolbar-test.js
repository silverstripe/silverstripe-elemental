/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, expect */

import React from 'react';
import { render, screen } from '@testing-library/react';

import Toolbar from '../Toolbar';

// Mock the Injector before importing Toolbar
jest.mock('lib/Injector', () => ({
  inject: jest.fn(() => (WrappedComponent) => WrappedComponent),
}));

const mockAddNewButtonComponent = jest.fn((props) => (
  <div data-testid="add-new-button-component">
    {props.areaId && <span data-testid="area-id">{props.areaId}</span>}
    {props.elementTypes && <span data-testid="element-types-count">{props.elementTypes.length}</span>}
  </div>
));

const elementTypes = [
  {
    name: 'TestElement',
    title: 'Test Block',
    icon: 'test-icon',
    editTabs: [{ title: 'Content', name: 'Main' }],
  },
  {
    name: 'AnotherElement',
    title: 'Another Block',
    icon: 'another-icon',
    editTabs: [{ title: 'Content', name: 'Main' }],
  },
];

function makeProps(obj = {}) {
  return {
    elementTypes,
    areaId: 1,
    AddNewButtonComponent: mockAddNewButtonComponent,
    ...obj,
  };
}

beforeEach(() => {
  mockAddNewButtonComponent.mockClear();
});

test('Toolbar renders with correct class name', () => {
  const { container } = render(<Toolbar {...makeProps()} />);
  const toolbar = container.querySelector('.element-editor__toolbar');
  expect(toolbar).not.toBeNull();
});

test('Toolbar renders AddNewButtonComponent', () => {
  render(<Toolbar {...makeProps()} />);
  const addNewButton = screen.getByTestId('add-new-button-component');
  expect(addNewButton).not.toBeNull();
});

test('Toolbar passes elementTypes to AddNewButtonComponent', () => {
  render(<Toolbar {...makeProps()} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      elementTypes,
    }),
    expect.anything()
  );
});

test('Toolbar passes areaId to AddNewButtonComponent', () => {
  render(<Toolbar {...makeProps({ areaId: 5 })} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      areaId: 5,
    }),
    expect.anything()
  );
});

test('Toolbar passes areaId 0 correctly', () => {
  render(<Toolbar {...makeProps({ areaId: 0 })} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      areaId: 0,
    }),
    expect.anything()
  );
});

test('Toolbar passes empty elementTypes array', () => {
  render(<Toolbar {...makeProps({ elementTypes: [] })} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      elementTypes: [],
    }),
    expect.anything()
  );
});

test('Toolbar passes multiple element types', () => {
  const multipleTypes = [
    { name: 'Type1', title: 'Block 1', icon: 'icon1', editTabs: [] },
    { name: 'Type2', title: 'Block 2', icon: 'icon2', editTabs: [] },
    { name: 'Type3', title: 'Block 3', icon: 'icon3', editTabs: [] },
  ];
  render(<Toolbar {...makeProps({ elementTypes: multipleTypes })} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      elementTypes: multipleTypes,
    }),
    expect.anything()
  );
});

test('Toolbar passes areaId and elementTypes together correctly', () => {
  const customAreaId = 42;
  render(<Toolbar {...makeProps({ areaId: customAreaId })} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      elementTypes,
      areaId: customAreaId,
    }),
    expect.anything()
  );
});

test('Toolbar renders AddNewButtonComponent once', () => {
  render(<Toolbar {...makeProps()} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledTimes(1);
});

test('Toolbar container is a div element', () => {
  const { container } = render(<Toolbar {...makeProps()} />);
  const toolbar = container.querySelector('.element-editor__toolbar');
  expect(toolbar.tagName).toBe('DIV');
});

test('Toolbar correctly renders with large areaId', () => {
  render(<Toolbar {...makeProps({ areaId: 999999 })} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      areaId: 999999,
    }),
    expect.anything()
  );
});

test('Toolbar with single element type', () => {
  const singleType = [
    { name: 'OnlyElement', title: 'Only Block', icon: 'only-icon', editTabs: [] },
  ];
  render(<Toolbar {...makeProps({ elementTypes: singleType })} />);
  expect(mockAddNewButtonComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      elementTypes: singleType,
    }),
    expect.anything()
  );
});

test('Toolbar accepts onDragDrop prop without errors', () => {
  const mockOnDragDrop = jest.fn();
  expect(() => {
    render(<Toolbar {...makeProps({ onDragDrop: mockOnDragDrop })} />);
  }).not.toThrow();
});

test('Toolbar renders without onDragDrop prop', () => {
  const props = makeProps();
  delete props.onDragDrop;
  expect(() => {
    render(<Toolbar {...props} />);
  }).not.toThrow();
});

test('Toolbar passes both elementTypes and areaId together', () => {
  const customAreaId = 15;
  const customTypes = [
    { name: 'Custom', title: 'Custom Block', icon: 'custom-icon', editTabs: [] },
  ];
  render(<Toolbar {...makeProps({ areaId: customAreaId, elementTypes: customTypes })} />);
  const call = mockAddNewButtonComponent.mock.calls[0][0];
  expect(call.areaId).toBe(customAreaId);
  expect(call.elementTypes).toBe(customTypes);
});

test('Toolbar element types are passed by reference', () => {
  const customTypes = [
    { name: 'RefTest', title: 'Ref Test Block', icon: 'ref-icon', editTabs: [] },
  ];
  render(<Toolbar {...makeProps({ elementTypes: customTypes })} />);
  const call = mockAddNewButtonComponent.mock.calls[0][0];
  expect(call.elementTypes).toBe(customTypes);
});
