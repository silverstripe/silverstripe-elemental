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
