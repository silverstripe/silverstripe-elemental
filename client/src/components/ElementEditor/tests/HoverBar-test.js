/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as HoverBar } from '../HoverBar';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('HoverBar', () => {
  const elementTypes = [
    {
      name: 'Main',
      title: 'Content',
      icon: '',
      tabs: ['', '']
    }
  ];
  const AddElementPopoverComponent = () => <div />;
  const hoverBarName = 'AddBlockHoverBar';
  const hoverBarAreaName = 'AddBlockHoverBarArea';

  describe('render()', () => {
    it.each([
      { areaId: 1, elementId: 0 },
      { areaId: 2, elementId: 3 },
    ])('renders top HoverBarComponent', ({ areaId, elementId }) => {
      const wrapper = mount(
        <HoverBar
          key={elementId}
          areaId={areaId}
          elementId={elementId}
          elementTypes={elementTypes}
          AddElementPopoverComponent={AddElementPopoverComponent}
        />
      );

      expect(wrapper.name()).toBe('HoverBar');
      expect(wrapper.find('div.element-editor__hover-bar').prop('id')).toBe(`${hoverBarName}_${areaId}_${elementId}`);
      expect(wrapper.find('button').prop('id')).toBe(`${hoverBarAreaName}_${areaId}_${elementId}`);
      expect(wrapper.find('AddElementPopoverComponent').prop('target')).toBe(`${hoverBarAreaName}_${areaId}_${elementId}`);
      expect(wrapper.find('AddElementPopoverComponent').prop('container')).toBe(`#${hoverBarName}_${areaId}_${elementId}`);
    });
  });
});
