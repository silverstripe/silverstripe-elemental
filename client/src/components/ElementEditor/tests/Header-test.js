/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as Header } from '../Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  const ActionMenuComponent = () => <div />;

  describe('render()', () => {
    it('should render the icon', () => {
      const wrapper = shallow(
        <Header
          id={'11'}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      expect(wrapper.instance().props.id).toBe('11');
      expect(wrapper.find('i.font-icon-block-file')).toHaveLength(1);
      expect(wrapper.find('#element-editor-header__icon11')).toHaveLength(1);
    });

    it('should render the title', () => {
      const wrapper = shallow(
        <Header
          id={'12'}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      expect(wrapper.instance().props.id).toBe('12');
      expect(wrapper.text()).toContain('Sample File Block');
    });

    it('should contain a Tooltip', () => {
      const wrapper = shallow(
        <Header
          id={'13'}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      expect(wrapper.instance().props.id).toBe('13');
      expect(wrapper.find('Tooltip').length).toBe(1);
      expect(wrapper.instance().props.elementType).toBe('File');
    });

    it('should render a "right caret" button when not expandable', () => {
      const wrapper = shallow(
        <Header
          expandable={false}
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-right-open-big')).toBe(true);
    });

    it('should render a "down caret" button when not expanded', () => {
      const wrapper = shallow(
        <Header
          expandable
          previewExpanded={false}
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-down-open-big')).toBe(true);
    });

    it('should render an "up caret" button when expanded', () => {
      const wrapper = shallow(
        <Header
          expandable
          previewExpanded
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-up-open-big')).toBe(true);
    });
  });

  describe('renderActionsMenu()', () => {
    it('should render an ActionMenu when the element is expandable', () => {
      const wrapper = shallow(
        <Header
          expandable
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      expect(wrapper.text()).toContain('ActionMenuComponent');
    });

    it('should not render an ActionMenu when the element is not expandable', () => {
      const wrapper = shallow(
        <Header
          expandable={false}
          ActionMenuComponent={ActionMenuComponent}
        />
      );

      expect(wrapper.text()).not.toContain('ActionMenuComponent');
    });
  });
});
