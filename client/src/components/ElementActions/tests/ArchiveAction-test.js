/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as ArchiveAction } from '../ArchiveAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@silverstripe/reactstrap-confirm', () => jest.fn().mockImplementation(
  () => Promise.resolve(true)
));
import confirm from '@silverstripe/reactstrap-confirm';

const mockReload = jest.fn();
jest.mock('lib/previewHelper', () => () => ({
  reload: mockReload
}));

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
          ID: 123,
          IsPublished: true,
          BlockSchema: { type: 'Test' }
        }}
        isPublished
        actions={{ handleArchiveBlock: mockMutation }}
        toggle={false}
        type={{ title: 'Test' }}
      />
    );

    confirm.mockClear();
    mockReload.mockClear();
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
    confirm.mockImplementationOnce(() => Promise.resolve(false));
    wrapper.find('button').simulate('click');
    expect(mockMutation).not.toHaveBeenCalled();
  });

  it('archives when accepting the confirmation', done => {
    wrapper.find('button').simulate('click');
    setTimeout(() => {
      expect(mockMutation).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('reloads the preview on archive', done => {
    wrapper.find('button').simulate('click');
    setTimeout(() => {
      expect(mockReload).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('indicates that the block will be sent to archive', done => {
    const unpublishedWrapper = mount(
      <ActionComponent
        title="My abstract action"
        element={{
          ID: 123,
          IsPublished: false,
          BlockSchema: { type: 'Test' }
        }}
        actions={{ handleArchiveBlock: mockMutation }}
        toggle={false}
        type={{ title: 'Test' }}
      />
    );

    unpublishedWrapper.find('button').simulate('click');
    setTimeout(() => {
      expect(confirm).toHaveBeenCalledWith(
        'Are you sure you want to send this block to the archive?',
        expect.anything()
      );
      done();
    });
  });

  it('indicates that the block will be unpublished before archiving', () => {
    wrapper.find('button').simulate('click');
    expect(confirm).toHaveBeenCalledWith(expect.stringContaining(
      'Warning: This block will be unpublished'
    ), expect.anything());
  });
});
