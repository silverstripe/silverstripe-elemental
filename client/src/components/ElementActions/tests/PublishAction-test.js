/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect, window */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Component as PublishAction } from '../PublishAction';
import { ElementContext } from '../../ElementEditor/Element';

window.jQuery = {
  noticeAdd: () => null
};

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

function makeProviderValue(obj = {}) {
  return {
    doPublishElement: false,
    formHasRendered: false,
    onAfterPublish: () => {},
    onPublishButtonClick: () => {},
    ...obj,
  };
}

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = PublishAction(WrappedComponent);
const ProvidedActionComponent = (props) => (
  <ElementContext.Provider value={makeProviderValue()}>
    <ActionComponent {...props} />
  </ElementContext.Provider>
);

test('PublishAction renders the title and class', () => {
  const { container } = render(<ProvidedActionComponent {...makeProps()}/>);
  expect(container.querySelector('button.element-editor__actions-publish').textContent).toBe('Publish');
});

test('PublishAction returns null when is the live version', () => {
  const { container } = render(
    <ProvidedActionComponent {...makeProps({
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
    <ProvidedActionComponent {...makeProps({
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
    <ProvidedActionComponent {...makeProps({
      type: {
        broken: true
      }
    })}
    />
  );
  expect(container.querySelectorAll('button.element-editor__actions-publish')).toHaveLength(0);
});

test('Clicking button calls onPublishButtonClick', () => {
  const onPublishButtonClick = jest.fn();
  const { container } = render(
    <ElementContext.Provider value={makeProviderValue({
      onPublishButtonClick,
    })}
    >
      <ActionComponent {...makeProps()}/>
    </ElementContext.Provider>
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-publish'));
  expect(onPublishButtonClick).toHaveBeenCalled();
});
