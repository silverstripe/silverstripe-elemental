/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect, window */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Component as PublishAction } from '../PublishAction';
import { ElementEditorContext } from '../../ElementEditor/ElementEditor';
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

function makeElementEditorProviderProps(obj = {}) {
  return {
    value: {
      fetchElements: () => {},
      ...obj,
    }
  };
}

function makeElementProviderProps(obj = {}) {
  return {
    value: {
      doPublishElement: false,
      formHasRendered: false,
      onAfterPublish: () => {},
      onPublishButtonClick: () => {},
      ...obj,
    }
  };
}

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = PublishAction(WrappedComponent);

test('PublishAction renders the title and class', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps()}>
        <ActionComponent {...makeProps()} />
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelector('button.element-editor__actions-publish').textContent).toBe('Publish');
});

test('PublishAction returns null when is the live version', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps()}>
        <ActionComponent {...makeProps({
          element: {
            isLiveVersion: true
          }
        })}
        />
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelector('button.element-editor__actions-publish')).toBe(null);
});

test('PublishAction is disabled when user doesn\'t have correct permissions', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps()}>
        <ActionComponent {...makeProps({
          element: {
            canPublish: false
          }
        })}
        />
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelector('button.element-editor__actions-publish').disabled).toBe(true);
});

test('PublishAction does not render a button when block is broken', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps()}>
        <ActionComponent {...makeProps({
          type: {
            broken: true
          }
        })}
        />
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelectorAll('button.element-editor__actions-publish')).toHaveLength(0);
});

test('Clicking button calls onPublishButtonClick', () => {
  const onPublishButtonClick = jest.fn();
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps({
        onPublishButtonClick
      })}
      >
        <ActionComponent {...makeProps()}/>
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-publish'));
  expect(onPublishButtonClick).toHaveBeenCalled();
});
