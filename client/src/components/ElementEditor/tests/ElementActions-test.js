/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as ElementActions } from '../ElementActions';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AbstractAction from 'components/ElementActions/AbstractAction';

Enzyme.configure({ adapter: new Adapter() });

describe('ElementActions', () => {
  let props = {};
  beforeEach(() => {
    props = {
      areaId: 1,
      editTabs: [
        { title: 'Content', name: 'Main' },
        { title: 'Settings', name: 'Settings' },
        { title: 'History', name: 'History' }
      ],
      type: { title: 'Some block' },
      ActionMenuComponent: (fnProps) => <div>{fnProps.children}</div>,
      handleEditTabsClick: () => {},
      inlineEditable: true
    };
  });

  describe('renderEditTabs()', () => {
    it('should map input tabs into an array of buttons', () => {
      const wrapper = shallow(<ElementActions {...props} />);
      const actions = wrapper.find(AbstractAction);
      expect(actions).toHaveLength(3);
      expect(actions.at(0).props().title).toEqual('Content');
      expect(actions.at(1).props().title).toEqual('Settings');
      expect(actions.at(2).props().title).toEqual('History');
    });
  });

  describe('render()', () => {
    it('should render the given "edit tabs" in the action menu', () => {
      const wrapper = shallow(<ElementActions {...props} />);

      // No dropdown separator should exist when there are no non-CMS actions
      expect(wrapper.html()).not.toContain('.dropdown-divider');

      // See all the relevant action menu options
      expect(wrapper.html()).toContain('Content');
      expect(wrapper.html()).toContain('Settings');
      expect(wrapper.html()).toContain('History');
    });

    it('should render a divider when CMS tab actions and default actions are rendered', () => {
      const wrapper = shallow(
        <ElementActions {...props}>
          <AbstractAction title="some button" />
        </ElementActions>
      );

      expect(wrapper.find('DropdownItem').length).toBe(1);
    });
  });

  describe('inlineEditable = false', () => {
    let newProps = null;
    beforeEach(() => {
      newProps = { ...props, inlineEditable: false };
    });

    it('should not render "edit tabs" or a divider', () => {
      const wrapper = shallow(
        <ElementActions {...newProps}>
          <AbstractAction title="DoSomething" />
        </ElementActions>
      );
      expect(wrapper.html()).not.toContain('.dropdown-divider');
      expect(wrapper.html()).not.toContain('Content');
      expect(wrapper.html()).toContain('DoSomething');
    });

    it('should not render an action where showForNonInlineEditableBlock is false', () => {
      const wrapper = shallow(
        <ElementActions {...newProps}>
          <AbstractAction title="Save" showForNonInlineEditableBlock={false} />
          <AbstractAction title="DoSomething" />
        </ElementActions>
      );
      expect(wrapper.html()).not.toContain('Save');
      expect(wrapper.html()).toContain('DoSomething');
    });
  });
});
