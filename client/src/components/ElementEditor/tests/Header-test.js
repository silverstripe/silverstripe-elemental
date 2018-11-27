/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as Header } from '../Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  const ElementActionsComponent = () => <div />;
  const element = {
    ID: '0',
    Title: 'Sample File Block',
  };
  const type = {
    inlineEditable: true,
      title: 'File',
      icon: 'font-icon-block-file',
      editTabs: [
        { name: 'content', title: 'Content' },
        { name: 'settings', title: 'Settings' },
        { name: 'history', title: 'History' },
      ],
  };

  describe('render()', () => {
    it('should render the icon', () => {
      element.ID = '11';
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.find('i.font-icon-block-file')).toHaveLength(1);
      expect(wrapper.find('#element-icon-11')).toHaveLength(1);
    });

    it('should render the title', () => {
      element.ID = '12';
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.text()).toContain('Sample File Block');
    });

    it('should contain a Tooltip', () => {
      element.ID = '13';
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      const tooltip = wrapper.find('Tooltip');
      expect(tooltip.length).toBe(1);
      expect(tooltip.children().text()).toBe('File');
    });

    it('should render a "right caret" button when not expandable', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          expandable={false}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-right-open-big')).toBe(true);
    });

    it('should render a "down caret" button when not expanded', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          expandable
          previewExpanded={false}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-down-open-big')).toBe(true);
    });

    it('should render an "up caret" button when expanded', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          expandable
          previewExpanded
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-up-open-big')).toBe(true);
    });

    it('should render an ElementActions component when the element is expandable', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          expandable
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.text()).toContain('ElementActionsComponent');
    });

    it('should not render an ElementActions when the element is not expandable', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          expandable={false}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      expect(wrapper.text()).not.toContain('ElementActionsComponent');
    });
  });

  describe('renderVersionedStateMessage()', () => {
    it('identifies draft versions', () => {
      element.IsPublished = false;
      element.IsLiveVersion = false;
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
        />
      );

      const versionedState = wrapper.find('.element-editor-header__version-state');
      expect(versionedState.prop('title')).toContain('not been published');
      expect(versionedState.hasClass('element-editor-header__version-state--draft')).toBe(true);
    });

    it('identifies modified versions', () => {
      element.IsPublished = true;
      element.IsLiveVersion = false;
      const wrapper = shallow(
        <Header
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
          element={element}
        />
      );

      const versionedState = wrapper.find('.element-editor-header__version-state');
      expect(versionedState.prop('title')).toContain('has unpublished changes');
      expect(versionedState.hasClass('element-editor-header__version-state--modified')).toBe(true);
    });

    it('ignores live versions', () => {
      element.IsPublished = true;
      element.IsLiveVersion = true;
      const wrapper = shallow(
        <Header
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
          element={element}
        />
      );

      expect(wrapper.find('.element-editor-header__version-state').length).toBe(0);
    });
  });
});
