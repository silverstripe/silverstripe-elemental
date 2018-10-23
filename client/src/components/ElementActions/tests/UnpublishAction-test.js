/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect, window */

import React from 'react';
import { Component as UnpublishAction } from '../UnpublishAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('UnpublishAction', () => {
  let wrapper = null;
  const mockMutation = jest.fn(() => new Promise((resolve) => { resolve(); }));
  const WrappedComponent = (props) => <div>{props.children}</div>;
  const ActionComponent = UnpublishAction(WrappedComponent);
  const jQuery = jest.fn();
  window.jQuery = jQuery;

  beforeEach(() => {
    wrapper = mount(
      <ActionComponent
        title="My abstract action"
        element={{
          ID: 123,
          IsPublished: true,
          BlockSchema: { type: 'Test' },
        }}
        actions={{ handleUnpublishBlock: mockMutation }}
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
    expect(wrapper.find('button').text()).toContain('Unpublish');
    expect(wrapper.find('button').hasClass('element-editor__actions-unpublish')).toBe(true);
  });

  it('returns null when is not published', () => {
    const draftWrapper = mount(
      <ActionComponent
        element={{ IsPublished: false, BlockSchema: { type: 'Test' } }}
        actions={{ handleUnpublishBlock: mockMutation }}
      />
    );

    expect(draftWrapper.find('button').length).toBe(0);
  });

  it('calls the unpublish mutation', () => {
    wrapper.find('button').simulate('click');
    expect(mockMutation).toHaveBeenCalled();
  });
});
