/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as ElementActions } from '../ElementActions';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('ElementActions', () => {
  const ActionMenuComponent = () => <div />;
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
      expect(result[0]).toEqual(
        <button key="Content" className="dropdown-item">Content</button>
      );
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
      expect(wrapper.find(ActionMenuComponent).children().find('DropdownItem').length).toBe(1);
      // See all the relevant action menu options
      expect(wrapper.find(ActionMenuComponent).children().map(node => node.text())).toEqual(
        expect.arrayContaining(testTabs)
      );
    });
  });
});
