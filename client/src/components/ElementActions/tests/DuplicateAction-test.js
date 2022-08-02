/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as DuplicateAction } from '../DuplicateAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('DuplicateAction', () => {
  let wrapper = null;
  const mockMutation = jest.fn(() => new Promise((resolve) => { resolve(); }));
  const WrappedComponent = (props) => <div>{props.children}</div>;
  const ActionComponent = DuplicateAction(WrappedComponent);

  beforeEach(() => {
    wrapper = mount(
      <ActionComponent
        title="My duplicate action"
        element={{
          ID: 123,
          BlockSchema: { type: 'Test' },
          canCreate: true
        }}
        type={{ broken: false }}
        actions={{ handlePublishBlock: mockMutation }}
        toggle={false}
      />
    );
  });

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('is disabled when user doesn\'t have correct permissions', () => {
    const duplicateWrapper = mount(
      <ActionComponent
        title="My duplicate action"
        element={{
          BlockSchema: { type: 'Test' },
          canCreate: false
        }}
        type={{ broken: false }}
        actions={{ handleDuplicateBlock: mockMutation }}
        toggle={false}
      />
    );

    expect(duplicateWrapper.find('button').first().prop('disabled')).toBe(true);
  });

  it('does not render a button when block is broken', () => {
    wrapper = mount(
      <ActionComponent
        title="My duplicate action"
        element={{
          ID: 123,
          BlockSchema: { type: 'Test' },
          canCreate: true
        }}
        type={{ broken: true }}
        actions={{ handleDuplicateBlock: mockMutation }}
        toggle={false}
      />
    );
    expect(wrapper.find('button').length).toBe(0);
  });
});
