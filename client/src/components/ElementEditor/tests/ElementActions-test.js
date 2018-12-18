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
  const testTabs = [
    { title: 'Content', name: 'Main' },
    { title: 'Settings', name: 'Settings' },
    { title: 'History', name: 'History' }
  ];
  const editTabsClick = () => {};

  describe('renderEditTabs()', () => {
    it('should map input tabs into an array of buttons', () => {
      const wrapper = shallow(
        <ElementActions
          areaId={1}
          editTabs={testTabs}
          ActionMenuComponent={ActionMenuComponent}
          handleEditTabsClick={editTabsClick}
        />
      );

      const actions = wrapper.find(AbstractAction);
      expect(actions).toHaveLength(3);
      expect(actions.at(0).props().title).toEqual('Content');
      expect(actions.at(1).props().title).toEqual('Settings');
      expect(actions.at(2).props().title).toEqual('History');
});
  });

  describe('render()', () => {
    it('should render the given "edit tabs" in the action menu', () => {
      const wrapper = shallow(
        <ElementActions
          areaId={1}
          editTabs={testTabs}
          ActionMenuComponent={ActionMenuComponent}
          handleEditTabsClick={editTabsClick}
        />
      );

      // No dropdown separator should exist when there are no non-CMS actions
      expect(wrapper.find('DropdownItem').length).toBe(0);

      // See all the relevant action menu options
      expect(wrapper.html()).toContain('Content');
      expect(wrapper.html()).toContain('Settings');
      expect(wrapper.html()).toContain('History');
    });

    it('should render a divider when CMS tab actions and default actions are rendered', () => {
      const wrapper = shallow(
        <ElementActions
          areaId={1}
          editTabs={testTabs}
          ActionMenuComponent={ActionMenuComponent}
          handleEditTabsClick={editTabsClick}
        >
          <AbstractAction title="some button" />
        </ElementActions>
      );

      expect(wrapper.find('DropdownItem').length).toBe(1);
    });
  });
});
