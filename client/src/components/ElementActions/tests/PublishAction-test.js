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
    formDirty: undefined,
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

test('Do trigger graphql mutation if doPublishElement is true and formHasRendered is true', () => {
  const handlePublishBlock = jest.fn(() => Promise.resolve());
  render(
    <ElementContext.Provider value={makeProviderValue({
      doPublishElement: true,
      formHasRendered: true,
    })}
    >
      <ActionComponent {...makeProps({ actions: { handlePublishBlock } })}/>
    </ElementContext.Provider>
  );
  expect(handlePublishBlock).toHaveBeenCalledWith(123);
});

test('Do not trigger graphql mutation if doPublishElement is true and formHasRendered is false', () => {
  // handlePublishBlock is a graphql mutation defined in publishBlockMutation.js
  const handlePublishBlock = jest.fn(() => Promise.resolve());
  render(
    <ElementContext.Provider value={makeProviderValue({
      doPublishElement: true,
      formHasRendered: false,
    })}
    >
      <ActionComponent {...makeProps({ actions: { handlePublishBlock } })}/>
    </ElementContext.Provider>
  );
  expect(handlePublishBlock).not.toHaveBeenCalled();
});

test('Do not trigger graphql mutation if doPublishElement is false and formHasRendered is true', () => {
  const handlePublishBlock = jest.fn(() => Promise.resolve());
  render(
    <ElementContext.Provider value={makeProviderValue({
      doPublishElement: false,
      formHasRendered: true,
    })}
    >
      <ActionComponent {...makeProps({ actions: { handlePublishBlock } })}/>
    </ElementContext.Provider>
  );
  expect(handlePublishBlock).not.toHaveBeenCalled();
});

test('onAfterPublish is called after graphql mutation', async () => {
  let value = 1;
  const handlePublishBlock = jest.fn(() => {
    value = 2;
    return Promise.resolve();
  });
  const onAfterPublish = jest.fn(() => {
    value = 3;
  });
  render(
    <ElementContext.Provider value={makeProviderValue({
      doPublishElement: true,
      formHasRendered: true,
      onAfterPublish,
    })}
    >
      <ActionComponent {...makeProps({ actions: { handlePublishBlock } })}/>
    </ElementContext.Provider>
  );
  // This is required to ensure the resolved promised returned by handlePublishBlock is handled
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(handlePublishBlock).toHaveBeenCalled();
  expect(onAfterPublish).toHaveBeenCalled();
  expect(value).toBe(3);
});
