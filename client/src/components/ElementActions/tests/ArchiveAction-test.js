/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Component as ArchiveAction } from '../ArchiveAction';

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = ArchiveAction(WrappedComponent);
const jQuery = jest.fn();
window.jQuery = jQuery;

function makeProps(obj = {}) {
  return {
    title: 'My abstract action',
    element: {
      id: 123,
      isPublished: true,
      blockSchema: { type: 'Test' }
    },
    isPublished: true,
    actions: {
      handleArchiveBlock: () => {}
    },
    toggle: false,
    ...obj,
  };
}

test('ArchiveAction renders the title and class', () => {
  const { container } = render(<ActionComponent {...makeProps()}/>);
  expect(container.querySelector('button.element-editor__actions-archive').textContent).toBe('Archive');
});

test('ArchiveAction does not archive when declining the confirmation', () => {
  global.confirm = () => false;
  const mockMutation = jest.fn(() => new Promise((resolve) => { resolve(); }));
  const { container } = render(<ActionComponent {...makeProps({
    actions: {
      handleArchiveBlock: mockMutation
    }
  })}
  />);
  fireEvent.click(container.querySelector('button.element-editor__actions-archive'));
  expect(mockMutation).not.toHaveBeenCalled();
});

test('ArchiveAction archives when accepting the confirmation', () => {
  global.confirm = () => true;
  const mockMutation = jest.fn(() => new Promise((resolve) => { resolve(); }));
  const { container } = render(<ActionComponent {...makeProps({
    actions: {
      handleArchiveBlock: mockMutation
    }
  })}
  />);
  fireEvent.click(container.querySelector('button.element-editor__actions-archive'));
  expect(mockMutation).toHaveBeenCalled();
});

test('ArchiveAction indicates that the block will be sent to archive when it is unpublished', () => {
  const mockConfirm = jest.fn();
  global.confirm = mockConfirm;
  const { container } = render(<ActionComponent {...makeProps({
    isPublished: false,
  })}
  />);
  fireEvent.click(container.querySelector('button.element-editor__actions-archive'));
  expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to send this block to the archive?');
});

test('ArchiveAction indicates that the block will be sent to archive when it is published', () => {
  const mockConfirm = jest.fn();
  global.confirm = mockConfirm;
  const { container } = render(<ActionComponent {...makeProps({
    isPublished: true,
  })}
  />);
  fireEvent.click(container.querySelector('button.element-editor__actions-archive'));
  expect(mockConfirm).toHaveBeenCalledWith('Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?');
});

test('ArchiveAction is disabled when user doesn\'t have correct permissions', () => {
  const { container } = render(<ActionComponent {...makeProps({
    element: {
      canDelete: false
    }
  })}
  />);
  expect(container.querySelector('button.element-editor__actions-archive').disabled).toBe(true);
});

test('ArchiveAction renders a button even when block is broken', () => {
  const { container } = render(<ActionComponent {...makeProps({
    type: {
      broken: true
    }
  })}
  />);
  expect(container.querySelectorAll('button.element-editor__actions-archive')).toHaveLength(1);
});
