/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as Header } from '../Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

const mockFormAction = jest.fn();

describe('Header', () => {
  describe('render()', () => {
    it('should render the icon', () => {
      const wrapper = shallow(
        <Header
          id={11}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          FormActionComponent={mockFormAction}
        />
      );

      expect(wrapper.instance().props.id).toBe(11);
      expect(wrapper.find('i.font-icon-block-file')).toHaveLength(1);
      expect(wrapper.find('#element-editor-header__icon11')).toHaveLength(1);
    });

    it('should render the title', () => {
      const wrapper = shallow(
        <Header
          id={12}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          FormActionComponent={mockFormAction}
        />
      );

      expect(wrapper.instance().props.id).toBe(12);
      expect(wrapper.text()).toContain('Sample File Block');
    });

    it('should contain a Tooltip', () => {
      const wrapper = shallow(
        <Header
          id={13}
          title="Sample File Block"
          elementType="File"
          fontIcon="font-icon-block-file"
          FormActionComponent={mockFormAction}
        />
      );

      expect(wrapper.instance().props.id).toBe(13);
      expect(wrapper.find('Tooltip').length).toBe(1);
      expect(wrapper.instance().props.elementType).toBe('File');
    });
  });
});
