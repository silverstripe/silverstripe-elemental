/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as ElementActions } from '../ElementActions';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';
import AbstractAction from 'components/ElementActions/AbstractAction';

Enzyme.configure({ adapter: new Adapter() });

describe('ElementActions', () => {
  const ActionMenuComponent = (props) => <div>{props.children}</div>;
  const testTabs = ['Content', 'Settings', 'History'];

  describe('renderEditTabs()', () => {
    it('should map input tabs into an array of buttons', () => {
      const wrapper = shallow(
        <ElementActions
          editTabs={testTabs}
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      const result = wrapper.instance().renderEditTabs();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(3);
      expect(result[0]).toEqual(<AbstractAction key="Content" title="Content" />);
    });
  });

  describe('render()', () => {
    it('should render the given "edit tabs" in the action menu', () => {
      const wrapper = shallow(
        <ElementActions
          editTabs={testTabs}
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      // See the dropdown separator
      expect(wrapper.find('DropdownItem').length).toBe(1);
      // See all the relevant action menu options
      expect(wrapper.html()).toContain('Content');
      expect(wrapper.html()).toContain('Settings');
      expect(wrapper.html()).toContain('History');
    });
  });
});
