/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as SaveAction } from '../SaveAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('SaveAction', () => {
  let wrapper = null;
  const mockMutation = jest.fn(() => new Promise((resolve) => { resolve(); }));
  const WrappedComponent = (props) => <div>{props.children}</div>;
  const ActionComponent = SaveAction(WrappedComponent);

  it('renders a button when block is expandable', () => {
    wrapper = mount(
      <ActionComponent
        title="My save action"
        element={{
          ID: 123,
          BlockSchema: { type: 'Test' },
          canCreate: true
        }}
        type={{ broken: false }}
        expandable
        actions={{ handlePublishBlock: mockMutation }}
        toggle={false}
      />
    );
    expect(wrapper.find('button').length).toBe(1);
  });

  it('does not render a button when block is not expandable', () => {
    wrapper = mount(
      <ActionComponent
        title="My save action"
        element={{
          ID: 123,
          BlockSchema: { type: 'Test' },
          canCreate: true
        }}
        type={{ broken: false }}
        expandable={false}
        actions={{ handlePublishBlock: mockMutation }}
        toggle={false}
      />
    );
    expect(wrapper.find('button').length).toBe(0);
  });

  it('does not render a button when block is broken', () => {
    wrapper = mount(
      <ActionComponent
        title="My save action"
        element={{
          ID: 123,
          BlockSchema: { type: 'Test' },
          canCreate: true
        }}
        type={{ broken: true }}
        expandable
        actions={{ handlePublishBlock: mockMutation }}
        toggle={false}
      />
    );
    expect(wrapper.find('button').length).toBe(0);
  });
});
