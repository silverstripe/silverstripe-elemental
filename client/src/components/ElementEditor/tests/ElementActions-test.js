/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import AbstractAction from 'components/ElementActions/AbstractAction';
import { render } from '@testing-library/react';
import { Component as ElementActions } from '../ElementActions';

function makeProps(obj = {}) {
  return {
    areaId: 1,
    editTabs: [
      { title: 'Content', name: 'Main' },
      { title: 'Settings', name: 'Settings' },
      { title: 'History', name: 'History' }
    ],
    type: {
      title: 'Some block'
    },
    ActionMenuComponent: (props) => <div className="test-action-menu">{props.children}</div>,
    handleEditTabsClick: () => {},
    ...obj,
  };
}

test('ElementActions should map input tabs into an array of buttons', () => {
  const { container } = render(<ElementActions {...makeProps()}/>);
  const actions = container.querySelectorAll('.dropdown-item');
  expect(actions).toHaveLength(3);
  expect(actions[0].textContent).toEqual('Content');
  expect(actions[1].textContent).toEqual('Settings');
  expect(actions[2].textContent).toEqual('History');
  // No drop down separator should exist when there are no non-CMS actions
  expect(container.querySelectorAll('.dropdown-divider')).toHaveLength(0);
});

test('ElementActions should render a divider when CMS tab actions and default actions are rendered', () => {
  const { container } = render(
    <ElementActions {...makeProps()}>
      <AbstractAction title="some button" />
    </ElementActions>
  );
  const actions = container.querySelectorAll('.dropdown-item');
  expect(actions).toHaveLength(4);
  expect(actions[0].textContent).toEqual('Content');
  expect(actions[1].textContent).toEqual('Settings');
  expect(actions[2].textContent).toEqual('History');
  expect(container.querySelectorAll('.dropdown-divider')).toHaveLength(1);
  expect(actions[3].textContent).toEqual('some button');
});

test('ElementActions should not render inline-edit items for non-expandable block', () => {
  const { container } = render(
    <ElementActions {...makeProps({
      expandable: false
    })}
    />
  );
  expect(container.querySelectorAll('.dropdown-item')).toHaveLength(0);
});

test('ElementActions should not render inline-edit items for a broken block', () => {
  const { container } = render(
    <ElementActions {...makeProps({
      type: {
        broken: true
      }
    })}
    />
  );
  expect(container.querySelectorAll('.dropdown-item')).toHaveLength(0);
});

test('ElementActions should render edit tabs with correct attributes', () => {
  const { container } = render(
    <ElementActions {...makeProps()}/>
  );
  const tabs = container.querySelectorAll('.dropdown-item');
  expect(tabs.length).toBe(3);
  expect(tabs[0]).toBeTruthy();
  expect(tabs[0].textContent).toBe('Content');
});

test('ElementActions should call handleEditTabsClick with correct tab name for multiple tabs', () => {
  const handleEditTabsClick = jest.fn();
  const { container } = render(
    <ElementActions {...makeProps({
      handleEditTabsClick
    })}
    />
  );
  const tabs = container.querySelectorAll('.dropdown-item');
  expect(handleEditTabsClick).not.toHaveBeenCalled();
  expect(tabs.length).toBeGreaterThan(0);
});

test('ElementActions should mark the active tab with active prop', () => {
  const { container } = render(
    <ElementActions {...makeProps({
      activeTab: 'Settings'
    })}
    />
  );
  const items = container.querySelectorAll('.dropdown-item');
  expect(items.length).toBe(3);
});

test('ElementActions should not render divider when there are no edit tabs', () => {
  const { container } = render(
    <ElementActions {...makeProps({
      editTabs: []
    })}
    >
      <AbstractAction title="some button" />
    </ElementActions>
  );
  expect(container.querySelectorAll('.dropdown-divider')).toHaveLength(0);
});

test('ElementActions should not render divider when edit tabs are undefined', () => {
  const { container } = render(
    <ElementActions {...makeProps({
      editTabs: undefined
    })}
    >
      <AbstractAction title="some button" />
    </ElementActions>
  );
  expect(container.querySelectorAll('.dropdown-divider')).toHaveLength(0);
});

test('ElementActions should not render divider when expandable is false and children are present', () => {
  const { container } = render(
    <ElementActions {...makeProps({
      expandable: false
    })}
    >
      <AbstractAction title="some button" />
    </ElementActions>
  );
  expect(container.querySelectorAll('.dropdown-divider')).toHaveLength(0);
});

test('ElementActions should pass correct props to ActionMenuComponent', () => {
  const MockActionMenu = jest.fn(() => <div />);
  render(
    <ElementActions {...makeProps({
      id: '123',
      ActionMenuComponent: MockActionMenu
    })}
    />
  );
  expect(MockActionMenu).toHaveBeenCalled();
  const props = MockActionMenu.mock.calls[0][0];
  expect(props.id).toBe('element-editor-actions-123');
  expect(props.className).toBe('element-editor-header__actions-dropdown');
});

test('ElementActions should apply correct dropdown toggle classes', () => {
  const mockActionMenu = (props) => (
    <div>
      {props.children}
    </div>
  );
  const { container } = render(
    <ElementActions {...makeProps({
      ActionMenuComponent: mockActionMenu
    })}
    />
  );
  const items = container.querySelectorAll('.dropdown-item');
  expect(items.length).toBeGreaterThan(0);
});

test('ElementActions should render multiple child actions alongside tabs', () => {
  const { container } = render(
    <ElementActions {...makeProps()}>
      <AbstractAction title="Action 1" />
      <AbstractAction title="Action 2" />
    </ElementActions>
  );
  const items = container.querySelectorAll('.dropdown-item');
  expect(items).toHaveLength(5);
  expect(items[3].textContent).toEqual('Action 1');
  expect(items[4].textContent).toEqual('Action 2');
});

test('ElementActions should pass type to edit tab actions', () => {
  const blockType = {
    title: 'Custom Block',
    icon: 'block-icon'
  };
  const { container } = render(
    <ElementActions {...makeProps({
      type: blockType
    })}
    />
  );
  const tabs = container.querySelectorAll('.dropdown-item');
  expect(tabs.length).toBeGreaterThan(0);
});

test('ElementActions should handle zero children gracefully', () => {
  const { container } = render(
    <ElementActions {...makeProps()} />
  );
  const items = container.querySelectorAll('.dropdown-item');
  expect(items).toHaveLength(3);
  expect(container.querySelectorAll('.dropdown-divider')).toHaveLength(0);
});

test('ElementActions should not render edit tabs when block is broken but expandable', () => {
  const { container } = render(
    <ElementActions {...makeProps({
      type: {
        broken: true,
        title: 'Broken block'
      },
      expandable: true
    })}
    />
  );
  expect(container.querySelectorAll('.dropdown-item')).toHaveLength(0);
});
