/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Component as ElementEditor } from '../ElementEditor';

function makeProps(obj = {}) {
  return {
    ToolbarComponent: ({ elementTypes }) => <div data-testid="test-toolbar" data-elementtypes={elementTypes.map(type => type.class).join(',')} />,
    ListComponent: () => <div className="test-list" />,
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
    ...obj,
  };
}

test('ElementEditor should render ElementList and Toolbar', () => {
  const { container } = render(<ElementEditor {...makeProps()}/>);
  expect(container.querySelectorAll('.test-list')).toHaveLength(1);
  expect(container.querySelectorAll('[data-testid="test-toolbar"]')).toHaveLength(1);
});

test('ElementEditor should filter all element types by those allowed for this editor', () => {
  render(
    <ElementEditor {...makeProps({
      allowedElements: ['Test\\Class\\Aye']
    })}
    />
  );
  expect(screen.getByTestId('test-toolbar').getAttribute('data-elementtypes')).toBe('Test\\Class\\Aye');
});

test('ElementEditor should retain the order specified by the allowed elements config', () => {
  render(
    <ElementEditor {...makeProps({
      allowedElements: ['Test\\Class\\Bee', 'Test\\Class\\TestElement']
    })}
    />
  );
  expect(screen.getByTestId('test-toolbar').getAttribute('data-elementtypes')).toBe('Test\\Class\\Bee,Test\\Class\\TestElement');
});
