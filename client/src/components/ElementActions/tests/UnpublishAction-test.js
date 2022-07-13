/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect, window */

import React from 'react';
import { Component as UnpublishAction } from '../UnpublishAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
          id: 123,
          isPublished: true,
          blockSchema: { type: 'Test' },
        }}
        type={{ title: 'Some block' }}
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
        element={{ isPublished: false, blockSchema: { type: 'Test' } }}
        actions={{ handleUnpublishBlock: mockMutation }}
        type={{ title: 'Some block' }}
      />
    );

    expect(draftWrapper.find('button').length).toBe(0);
  });

  it('calls the unpublish mutation', () => {
    wrapper.find('button').simulate('click');
    expect(mockMutation).toHaveBeenCalled();
  });

  it('is disabled when user doesn\'t have correct permissions', () => {
    const unpublishWrapper = mount(
      <ActionComponent
        element={{ isPublished: true, BlockSchema: { type: 'Test' }, canUnpublish: false }}
        actions={{ handleUnpublishBlock: mockMutation }}
        type={{ title: 'Some block' }}
      />
    );

    expect(unpublishWrapper.find('button').first().prop('disabled')).toBe(true);
  });

  it('does not render a button when block is broken', () => {
    wrapper = mount(
      <ActionComponent
        title="My unpublish action"
        element={{
          id: 123,
          isPublished: true,
          blockSchema: { type: 'Test' },
        }}
        type={{ broken: true }}
        actions={{ handleUnpublishBlock: mockMutation }}
        toggle={false}
      />
    );
    expect(wrapper.find('button').length).toBe(0);
  });
});
