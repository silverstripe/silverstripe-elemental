/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import Summary from '../Summary';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Summary', () => {
  describe('render()', () => {
    it('should render an image if the fileUrl prop is provided', () => {
      const wrapper = shallow(
        <Summary
          fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
          fileTitle="Sample Image"
          content="Sample content"
        />
      );

      expect(wrapper.find('img').length).toBe(1);
    });

    it('should not render an image if the fileUrl prop is not provided', () => {
      const wrapper = shallow(
        <Summary
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
      <Summary
        fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
        fileTitle="Sample Image"
        content="Sample content"
      />
    );

    expect(wrapper.find('p').length).toBe(1);
  });

  it('should not render a content summary if the content prop is not provided', () => {
    const wrapper = shallow(
      <Summary
        fileUrl="/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg"
        fileTitle=""
        content=""
      />
    );

    expect(wrapper.find('p').length).toBe(0);
  });
});
