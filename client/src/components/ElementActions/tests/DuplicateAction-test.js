/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import { Component as DuplicateAction } from '../DuplicateAction';

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = DuplicateAction(WrappedComponent);

function makeProps(obj = {}) {
  return {
    title: 'My duplicate action',
    element: {
      ID: 123,
      BlockSchema: { type: 'Test' },
      canCreate: true,
    },
    type: {
      broken: false
    },
    actions: {
      handlePublishBlock: () => {}
    },
    toggle: false,
    ...obj,
  };
}

test('DuplicateAction renders a button', () => {
  const { container } = render(<ActionComponent {...makeProps()}/>);
  expect(container.querySelectorAll('button.element-editor__actions-duplicate')).toHaveLength(1);
});

test('DuplicateAction is disabled when user doesn\'t have correct permissions', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      element: {
        BlockSchema: { type: 'Test' },
        canCreate: false
      }
    })}
    />
  );
  expect(container.querySelector('button.element-editor__actions-duplicate').disabled).toBe(true);
});

test('DuplicateAction does not render a button when block is broken', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      type: { broken: true }
    })}
    />
  );
  expect(container.querySelectorAll('button.element-editor__actions-duplicate')).toHaveLength(0);
});
