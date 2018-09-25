/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect, window */

import React from 'react';
import { Component as PublishAction } from '../PublishAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('PublishAction', () => {
  let wrapper = null;
  const mockMutation = jest.fn(() => new Promise((resolve) => { resolve(); }));
  const WrappedComponent = (props) => <div>{props.children}</div>;
  const ActionComponent = PublishAction(WrappedComponent);
  const jQuery = jest.fn();
  window.jQuery = jQuery;

  beforeEach(() => {
    wrapper = mount(
      <ActionComponent
        id={123}
        version={234}
        isLiveVersion={false}
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

  it('publishes from draft to live', () => {
    wrapper.find('button').simulate('click');
    expect(mockMutation).toHaveBeenCalledWith(123, 'DRAFT', 'LIVE', 234);
  });

  it('returns null when is the live version', () => {
    const draftWrapper = mount(
      <ActionComponent isLiveVersion />
    );

    expect(draftWrapper.find('button').length).toBe(0);
  });
});
