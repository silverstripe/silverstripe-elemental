/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import { Component as ElementList } from '../ElementList';

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
    blocks: [
      {
        id: '1',
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
        id: '2',
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

test('ElementList renders elements when blocks are provided as props', () => {
  const { container } = render(<ElementList {...makeProps()}/>);
  expect(container.querySelectorAll('.test-element')).toHaveLength(2);
  expect(container.querySelectorAll('.test-loading')).toHaveLength(0);
});

test('ElementList renders a loading component', () => {
  const { container } = render(
    <ElementList {...makeProps({
      key: '2',
      blocks: [],
      loading: true
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
      blocks: [],
      loading: false
    })}
    />
  );
  expect(container.querySelectorAll('.test-element')).toHaveLength(0);
  expect(container.querySelectorAll('.test-loading')).toHaveLength(0);
  const placeholder = container.querySelector('.elemental-editor-list--empty');
  expect(placeholder.textContent).toBe('Add blocks to place your content');
});
