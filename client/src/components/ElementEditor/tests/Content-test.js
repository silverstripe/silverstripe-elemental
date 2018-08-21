/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import Content from '../Content';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4/build/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Content', () => {
  describe('render()', () => {
    it('should render an image if the fileUrl prop is provided', () => {
      const wrapper = shallow(
        <Content
          fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
          fileTitle="Sample Image"
          content="Sample content"
        />
      );

      expect(wrapper.find('img').length).toBe(1);
    });

    it('should not render an image if the fileUrl prop is not provided', () => {
      const wrapper = shallow(
        <Content
          fileUrl=""
          fileTitle=""
          content="Sample content"
        />
      );

      expect(wrapper.find('img').length).toBe(0);
    });
  });

  it('should render a content summary if the content is provided', () => {
    const wrapper = shallow(
      <Content
        fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
        fileTitle="Sample Image"
        content="Sample content"
      />
    );

    expect(wrapper.find('p').length).toBe(1);
  });

  it('should not render a content summary if the content prop is not provided', () => {
    const wrapper = shallow(
      <Content
        fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
        fileTitle=""
        content=""
      />
    );

    expect(wrapper.find('p').length).toBe(0);
  });

  it('returns null when no content or image is provided', () => {
    const wrapper = shallow(
      <Content
        fileUrl=""
        fileTitle=""
        content=""
      />
    );

    expect(wrapper.type()).toBeNull();
  });
});
