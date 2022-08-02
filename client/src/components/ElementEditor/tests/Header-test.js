/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as Header } from '../Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  const ElementActionsComponent = () => <div />;
  const element = {
    id: '0',
    title: 'Sample File Block',
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
  const typeBroken = Object.assign({}, type, { broken: true, obsoleteClassName: 'RemovedClass' });

  describe('render()', () => {
    it('should render the icon', () => {
      element.id = '11';
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      expect(wrapper.find('i.font-icon-block-file')).toHaveLength(1);
      expect(wrapper.find('#element-icon-11')).toHaveLength(1);
    });

    it('should render the title', () => {
      element.id = '12';
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      expect(wrapper.text()).toContain('Sample File Block');
    });

    it('The title should be overridden for broken elements', () => {
      element.id = '12';
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={typeBroken}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      expect(wrapper.text()).toContain('This element is of obsolete type RemovedClass');
    });

    it('should contain a Tooltip', () => {
      element.id = '13';
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      const tooltip = wrapper.find('Tooltip');
      expect(tooltip.length).toBe(1);
      expect(tooltip.children().text()).toBe('File');
    });

    it('should not contain a Tooltip for a broken element', () => {
      element.id = '13';
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={typeBroken}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      const tooltip = wrapper.find('Tooltip');
      expect(tooltip.length).toBe(0);
    });

    it('should render a "right caret" button when not expandable', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          expandable={false}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
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
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
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
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(1);
      expect(expandButton.hasClass('font-icon-up-open-big')).toBe(true);
    });

    it('should not render a "caret" button for a broken element', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={typeBroken}
          expandable={false}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      const expandButton = wrapper.find('.element-editor-header__expand');
      expect(expandButton.length).toBe(0);
    });

    it('should render an ElementActions component when the element is expandable', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          expandable
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      expect(wrapper.text()).toContain('ElementActionsComponent');
    });

    it('should render an ElementActions even when the element is not expandable', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          expandable={false}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      expect(wrapper.text()).toContain('ElementActionsComponent');
    });

    it('should render an ElementActions even when the element is broken', () => {
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={typeBroken}
          expandable
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      expect(wrapper.text()).toContain('ElementActionsComponent');
    });
  });

  describe('renderVersionedStateMessage()', () => {
    it('identifies draft versions', () => {
      element.published = false;
      element.liveVersion = false;
      const wrapper = shallow(
        <Header
          element={element}
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      const versionedState = wrapper.find('.element-editor-header__version-state');
      expect(versionedState.prop('title')).toContain('not been published');
      expect(versionedState.hasClass('element-editor-header__version-state--draft')).toBe(true);
    });

    it('identifies modified versions', () => {
      element.isPublished = true;
      element.isLiveVersion = false;
      const wrapper = shallow(
        <Header
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
          element={element}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      const versionedState = wrapper.find('.element-editor-header__version-state');
      expect(versionedState.prop('title')).toContain('has unpublished changes');
      expect(versionedState.hasClass('element-editor-header__version-state--modified')).toBe(true);
    });

    it('ignores live versions', () => {
      element.isPublished = true;
      element.isLiveVersion = true;
      const wrapper = shallow(
        <Header
          areaId={1}
          type={type}
          ElementActionsComponent={ElementActionsComponent}
          element={element}
          connectDragSource={content => content}
          connectDragPreview={content => content}
          onDragEnd={() => {}}
        />
      );

      expect(wrapper.find('.element-editor-header__version-state').length).toBe(0);
    });
  });
});
