/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as Content } from '../Content';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Content', () => {
  const FormBuilderComponent = () => <div />;
  const SummaryComponent = () => <div />;

  describe('render()', () => {
    it('should render the Summary component if the preview is not expanded', () => {
      const wrapper = shallow(
        <Content
          fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
          fileTitle=""
          content=""
          previewExpanded={false}
          FormBuilderComponent={FormBuilderComponent}
          SummaryComponent={SummaryComponent}
        />
      );

      expect(wrapper.name()).toEqual('div');
      expect(wrapper.find(SummaryComponent)).toHaveLength(1);
    });

    it('should render the FormBuilder component if the preview is expanded', () => {
      const wrapper = shallow(
        <Content
          fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
          fileTitle=""
          content=""
          previewExpanded
          FormBuilderComponent={FormBuilderComponent}
          SummaryComponent={SummaryComponent}
        />
      );

      expect(wrapper.name()).toEqual('div');
      expect(wrapper.find(FormBuilderComponent)).toHaveLength(1);
    });

    it('returns null when no content or image is provided', () => {
      const wrapper = shallow(
        <Content
          fileUrl=""
          fileTitle=""
          content=""
          previewExpanded
          FormBuilderComponent={FormBuilderComponent}
          SummaryComponent={SummaryComponent}
        />
      );

      expect(wrapper.type()).toBeNull();
    });
  });
});
