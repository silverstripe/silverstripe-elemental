/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect, window */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Component as UnpublishAction } from '../UnpublishAction';

window.jQuery = {
  noticeAdd: jest.fn()
};

function makeProps(obj = {}) {
  return {
    title: 'My unpublish action',
    element: {
      id: 123,
      isPublished: true,
      blockSchema: { type: 'Test' },
    },
    type: { title: 'Some block' },
    actions: {
      handleUnpublishBlock: () => {}
    },
    toggle: false,
    ...obj,
  };
}

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = UnpublishAction(WrappedComponent);

test('UnpublishAction renders the title and class', () => {
  const { container } = render(
    <ActionComponent {...makeProps()} />
  );
  expect(container.querySelector('button.element-editor__actions-unpublish').textContent).toBe('Unpublish');
});

test('UnpublishAction returns null when is not published', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      element: {
        isPublished: false
      }
    })}
    />
  );
  expect(container.querySelectorAll('button')).toHaveLength(0);
});

test('UnpublishAction calls the unpublish mutation', () => {
  const mockMutation = jest.fn(() => new Promise((resolve) => { resolve(); }));
  const { container } = render(
    <ActionComponent {...makeProps({
      actions: {
        handleUnpublishBlock: mockMutation
      }
    })}
    />
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-unpublish'));
  expect(mockMutation).toHaveBeenCalledWith(123);
});

test('UnpublishAction is disabled when user doesn\'t have correct permissions', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      element: {
        isPublished: true,
        canUnpublish: false
      }
    })}
    />
  );
  expect(container.querySelector('button.element-editor__actions-unpublish').disabled).toBe(true);
});

test('UnpublishAction does not render a button when block is broken', () => {
  const { container } = render(
    <ActionComponent {...makeProps({
      type: {
        broken: true
      }
    })}
    />
  );
  expect(container.querySelectorAll('button.element-editor__actions-unpublish')).toHaveLength(0);
});
