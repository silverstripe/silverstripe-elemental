/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Component as SaveAction } from '../SaveAction';
import { ElementEditorContext } from '../../ElementEditor/ElementEditor';
import { ElementContext } from '../../ElementEditor/Element';

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
    expandable: true,
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
      formHasRendered: false,
      onAfterSave: () => {},
      doSaveElement: false,
      onSaveButtonClick: () => {},
      submitForm: () => {},
      formDirty: true,
      ...obj,
    }
  };
}

const WrappedComponent = (props) => <div>{props.children}</div>;
const ActionComponent = SaveAction(WrappedComponent);

test('SaveAction does not render a button when block is expandable and not formDirty', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps({
        formDirty: false
      })}
      >
        <ActionComponent {...makeProps()} />
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelectorAll('button.element-editor__actions-save')).toHaveLength(0);
});

test('SaveAction renders a button when block is expandable and formDirty', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps()}>
        <ActionComponent {...makeProps()} />
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelectorAll('button.element-editor__actions-save')).toHaveLength(1);
});

test('SaveAction does not render a button when block is not expandable', () => {
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps()}>
        <ActionComponent {...makeProps({
          expandable: false
        })}
        />
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  expect(container.querySelectorAll('button.element-editor__actions-save')).toHaveLength(0);
});

test('SaveAction does not render a button when block is broken', () => {
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
  expect(container.querySelectorAll('button.element-editor__actions-save')).toHaveLength(0);
});

test('Clicking button calls onSaveButtonClick', () => {
  const onSaveButtonClick = jest.fn();
  const { container } = render(
    <ElementEditorContext.Provider {...makeElementEditorProviderProps()}>
      <ElementContext.Provider {...makeElementProviderProps({
        onSaveButtonClick,
      })}
      >
        <ActionComponent {...makeProps()} />
      </ElementContext.Provider>
    </ElementEditorContext.Provider>
  );
  fireEvent.click(container.querySelector('button.element-editor__actions-save'));
  expect(onSaveButtonClick).toHaveBeenCalled();
});
