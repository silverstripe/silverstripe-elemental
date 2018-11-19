/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as Content } from '../Content';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Content', () => {
  const InlineEditFormComponent = () => <div />;
  const SummaryComponent = () => <div />;

  describe('render()', () => {
    it('should render the Summary component if the preview is not expanded', () => {
      const wrapper = shallow(
        <Content
          fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
          fileTitle=""
          content=""
          previewExpanded={false}
          InlineEditFormComponent={InlineEditFormComponent}
          SummaryComponent={SummaryComponent}
        />
      );

      expect(wrapper.name()).toEqual('div');
      expect(wrapper.find(SummaryComponent)).toHaveLength(1);
    });

    it('should render the InlineEditForm component if the preview is expanded', () => {
      const wrapper = shallow(
        <Content
          fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
          fileTitle=""
          content=""
          previewExpanded
          InlineEditFormComponent={InlineEditFormComponent}
          SummaryComponent={SummaryComponent}
        />
      );

      expect(wrapper.name()).toEqual('div');
      expect(wrapper.find(InlineEditFormComponent)).toHaveLength(1);
    });

    it('returns a div when no content or image is provided', () => {
      const wrapper = shallow(
        <Content
          fileUrl=""
          fileTitle=""
          content=""
          previewExpanded
          InlineEditFormComponent={InlineEditFormComponent}
          SummaryComponent={SummaryComponent}
        />
      );

      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find(SummaryComponent)).toHaveLength(0);
    });
  });
});
