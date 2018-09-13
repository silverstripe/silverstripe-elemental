/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import AbstractAction from '../AbstractAction';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('AbstractAction', () => {
  const clickHandler = jest.fn();
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <AbstractAction
        onClick={clickHandler}
        title="My abstract action"
        disabled={false}
        extraClass="foo-bar"
      />
    );
  });

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
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
});
