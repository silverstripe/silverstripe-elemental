/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect, window */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Component as PublishAction } from '../PublishAction';

jest.mock('isomorphic-fetch', () =>
  () => Promise.resolve({
    json: () => ({}),
  })
);

window.jQuery = {
  noticeAdd: () => null
};

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = PublishAction(WrappedComponent);

function makeProps(obj = {}) {
  return {
    element: {
      id: 123,
      version: 234,
      liveVersion: false,
      blockSchema: { type: 'Test' }
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

test('PublishAction renders the title and class', () => {
  const { container } = render(<ActionComponent {...makeProps()}/>);
  expect(container.querySelector('button.element-editor__actions-publish').textContent).toBe('Publish');
});

test('PublishAction publishes from draft to live', async () => {
  const mockMutation = jest.fn(() => new Promise((resolve) => resolve()));
  const { container } = render(
    <ActionComponent {...makeProps({
      actions: {
        handlePublishBlock: mockMutation
      }
    })}
    />
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-publish'));
  await new Promise((resolve) => resolve());
  expect(mockMutation).toHaveBeenCalledWith(123);
});

test('PublishAction returns null when is the live version', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      element: {
        isLiveVersion: true
      }
    })}
    />
  );
  expect(container.querySelector('button.element-editor__actions-publish')).toBe(null);
});

test('PublishAction is disabled when user doesn\'t have correct permissions', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      element: {
        canPublish: false
      }
    })}
    />
  );
  expect(container.querySelector('button.element-editor__actions-publish').disabled).toBe(true);
});

test('PublishAction does not render a button when block is broken', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      type: {
        broken: true
      }
    })}
    />
  );
  expect(container.querySelectorAll('button.element-editor__actions-publish')).toHaveLength(0);
});
