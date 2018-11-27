/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as Element } from '../Element';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Element', () => {
  const HeaderComponent = () => <div />;
  const ContentComponent = () => <div />;

  const element = {
    ID: '2',
    Title: 'Block Title',
    BlockSchema: {
      actions: {
        edit: 'admin/pages/edit/EditForm/7/field/ElementalArea/item/2/edit?stage=Stage'
      },
      content: 'Block Content',
      iconClass: 'font-icon-block-content',
      type: 'Content'
    },
    InlineEditable: true,
    IsLiveVersion: true,
    IsPublished: true,
  };
  const type = {
    icon: 'font-icon-block-content',
    title: 'Content'
  };

  const identity = el => el;

  const defaultProps = {
    HeaderComponent,
    ContentComponent,
    connectDragSource: identity,
    connectDragPreview: identity,
    connectDropTarget: identity,
    isDragging: false,
    isOver: false,
  };

  describe('render()', () => {
    it('should render the HeaderComponent and the ContentComponent', () => {
      const wrapper = shallow(
        <Element
          element={element}
          areaId={1}
          type={type}
          link={'admin/pages/edit/EditForm/7/field/ElementalArea/item/2/edit?stage=Stage'}
          {...defaultProps}
        />
      );

      expect(wrapper.find(HeaderComponent)).toHaveLength(1);
      expect(wrapper.find(ContentComponent)).toHaveLength(1);
    });

    it('should render null if no ID is given', () => {
      const wrapper = shallow(
        <Element
          element={{
            ...element,
            ID: ''
          }}
          areaId={1}
          type={type}
          link={'admin/pages/edit/EditForm/7/field/ElementalArea/item/2/edit?stage=Stage'}
          {...defaultProps}
        />
      );

      expect(wrapper.find(HeaderComponent)).toHaveLength(0);
      expect(wrapper.find(ContentComponent)).toHaveLength(0);
      expect(wrapper.type()).toBeNull();
    });
  });

  describe('getVersionedStateClassName()', () => {
    it('identifies draft elements', () => {
      const wrapper = shallow(
        <Element
          element={{
            ...element,
            IsPublished: false,
          }}
          areaId={1}
          type={type}
          link="/"
          {...defaultProps}
        />
      );

      expect(wrapper.hasClass('element-editor__element--draft')).toBe(true);
    });

    it('identifies modified elements', () => {
      const wrapper = shallow(
        <Element
          element={{
            ...element,
            IsPublished: true,
            IsLiveVersion: false,
          }}
          areaId={1}
          type={type}
          link="/"
          {...defaultProps}
        />
      );

      expect(wrapper.hasClass('element-editor__element--modified')).toBe(true);
    });

    it('identifies published elements', () => {
      const wrapper = shallow(
        <Element
          element={{
            ...element,
            IsPublished: true,
            IsLiveVersion: true,
          }}
          areaId={1}
          type={type}
          link="/"
          {...defaultProps}
        />
      );

      expect(wrapper.hasClass('element-editor__element--published')).toBe(true);
    });
  });
});
