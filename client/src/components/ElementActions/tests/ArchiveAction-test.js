/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as ArchiveAction } from '../ArchiveAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ArchiveAction', () => {
  let wrapper = null;
  const mockMutation = jest.fn(() => new Promise((resolve) => { resolve(); }));
  const WrappedComponent = (props) => <div>{props.children}</div>;
  const ActionComponent = ArchiveAction(WrappedComponent);

  beforeEach(() => {
    wrapper = mount(
      <ActionComponent
        title="My abstract action"
        element={{
          id: 123,
          isPublished: true,
          blockSchema: { type: 'Test' }
        }}
        isPublished
        actions={{ handleArchiveBlock: mockMutation }}
        toggle={false}
      />
    );
  });

  it('renders the wrapped component', () => {
    expect(wrapper.children().first().type()).toEqual(WrappedComponent);
  });

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('renders the title and class', () => {
    expect(wrapper.find('button').text()).toContain('Archive');
    expect(wrapper.find('button').hasClass('element-editor__actions-archive')).toBe(true);
  });

  it('does not archive when declining the confirmation', () => {
    global.confirm = () => false;
    wrapper.find('button').simulate('click');
    expect(mockMutation).not.toHaveBeenCalled();
  });

  it('archives when accepting the confirmation', () => {
    global.confirm = () => true;
    wrapper.find('button').simulate('click');
    expect(mockMutation).toHaveBeenCalled();
  });

  it('indicates that the block will be sent to archive', () => {
    const unpublishedWrapper = mount(
      <ActionComponent
        title="My abstract action"
        element={{
          id: 123,
          isPublished: false,
          blockSchema: { type: 'Test' }
        }}
        actions={{ handleArchiveBlock: mockMutation }}
        toggle={false}
      />
    );
    const mockConfirm = jest.fn();
    global.confirm = mockConfirm;

    unpublishedWrapper.find('button').simulate('click');
    expect(mockConfirm).toHaveBeenCalledWith(
      'Are you sure you want to send this block to the archive?'
    );
  });

  it('indicates that the block will be unpublished before archiving', () => {
    const mockConfirm = jest.fn();
    global.confirm = mockConfirm;

    wrapper.find('button').simulate('click');
    expect(mockConfirm).toHaveBeenCalledWith(expect.stringContaining(
      'Warning: This block will be unpublished'
    ));
  });

  it('is disabled when user doesn\'t have correct permissions', () => {
    const archiveWrapper = mount(
      <ActionComponent
        title="My abstract action"
        element={{
          ID: 123,
          IsPublished: false,
          BlockSchema: { type: 'Test' },
          canDelete: false
        }}
        actions={{ handleArchiveBlock: mockMutation }}
        toggle={false}
      />
    );

    expect(archiveWrapper.find('button').first().prop('disabled')).toBe(true);
  });

  it('renders a button even when block is broken', () => {
    wrapper = mount(
      <ActionComponent
        title="My unpublish action"
        element={{
          id: 123,
          isPublished: true,
          blockSchema: { type: 'Test' }
        }}
        isPublished
        type={{ broken: true }}
        actions={{ handleArchiveBlock: mockMutation }}
        toggle={false}
      />
    );
    expect(wrapper.find('button').length).toBe(1);
  });
});
