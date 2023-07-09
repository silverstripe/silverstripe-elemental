/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import { Component as SaveAction } from '../SaveAction';

jest.mock('isomorphic-fetch', () =>
  () => Promise.resolve({
    json: () => ({}),
  })
);

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = SaveAction(WrappedComponent);

function makeProps(obj = {}) {
  return {
    title: 'My save action',
    element: {
      ID: 123,
      BlockSchema: { type: 'Test' },
      canCreate: true,
    },
    type: { broken: false },
    expandable: true,
    actions: { handlePublishBlock: () => { } },
    toggle: false,
    ...obj,
  };
}

test('SaveAction renders a button when block is expandable', () => {
  const { container } = render(
    <ActionComponent {...makeProps()} />
  );
  expect(container.querySelectorAll('button.element-editor__actions-save')).toHaveLength(1);
});

test('SaveAction does not render a button when block is not expandable', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      expandable: false
    })}
    />
  );
  expect(container.querySelectorAll('button.element-editor__actions-save')).toHaveLength(0);
});

test('SaveAction does not render a button when block is broken', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      type: {
        broken: true
      }
    })}
    />
  );
  expect(container.querySelectorAll('button.element-editor__actions-save')).toHaveLength(0);
});
