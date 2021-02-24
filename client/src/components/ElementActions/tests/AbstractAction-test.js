/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import AbstractAction from '../AbstractAction';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('AbstractAction', () => {
  const clickHandler = jest.fn();
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(
      <AbstractAction
        onClick={clickHandler}
        title="My abstract action"
        disabled={false}
        className="foo-bar"
        toggle={false}
      />
    );
  });

  it('renders a DropdownItem', () => {
    expect(wrapper.find('DropdownItem').length).toBe(1);
  });

  it('includes the title text', () => {
    expect(wrapper.text()).toContain('My abstract action');
  });

  it('delegates clicking to the provided handler', () => {
    wrapper.find('button').simulate('click');
    expect(clickHandler).toHaveBeenCalled();
  });

  it('adds provided extra classes', () => {
    expect(wrapper.find('button').hasClass('foo-bar')).toBe(true);
  });

  it('uses the label prop for the button label if label prop is supplied', () => {
    const wrapperWithLabel = mount(
      <AbstractAction
        title="My title"
        label="My label"
      />
    );
    expect(wrapperWithLabel.find('button').text()).toBe('My label');
  });

  it('uses the title prop for the button label if label prop is not supplied', () => {
    const wrapperWithLabel = mount(
      <AbstractAction
        title="My title"
      />
    );
    expect(wrapperWithLabel.find('button').text()).toBe('My title');
  });
});
