/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect, window */

import React from 'react';
import { Component as PublishAction } from '../PublishAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('PublishAction', () => {
  let wrapper = null;
  let mockMutation = null;
  const WrappedComponent = (props) => <div>{props.children}</div>;
  const ActionComponent = PublishAction(WrappedComponent);
  const jQuery = jest.fn();
  window.jQuery = jQuery;

  beforeEach(() => {
    mockMutation = jest.fn(() => new Promise((resolve) => resolve()));
    wrapper = mount(
      <ActionComponent
        title="My abstract action"
        element={{
          ID: 123,
          Version: 234,
          IsLiveVersion: false,
          BlockSchema: { type: 'Test' }
        }}
        actions={{ handlePublishBlock: mockMutation }}
        toggle={false}
      />
    );

    jQuery.noticeAdd = jest.fn();
  });

  it('renders the wrapped component', () => {
    expect(wrapper.children().first().type()).toEqual(WrappedComponent);
  });

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('renders the title and class', () => {
    expect(wrapper.find('button').text()).toContain('Publish');
    expect(wrapper.find('button').hasClass('element-editor__actions-publish')).toBe(true);
  });

  it('publishes from draft to live', async () => {
    wrapper.find('button').simulate('click');

    // The click handler does not return a promise, but it does USE one.
    // We need to await the promise resolution cycle before asserting.
    await new Promise((resolve) => resolve());

    expect(mockMutation).toHaveBeenCalledWith(123, 'DRAFT', 'LIVE', 234);
  });

  it('returns null when is the live version', () => {
    const draftWrapper = mount(
      <ActionComponent
        element={{ IsLiveVersion: true, BlockSchema: { type: 'Test' } }}
        actions={{ handlePublishBlock: mockMutation }}
      />
    );

    expect(draftWrapper.find('button').length).toBe(0);
  });
});
