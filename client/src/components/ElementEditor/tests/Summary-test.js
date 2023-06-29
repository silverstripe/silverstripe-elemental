/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import Summary from '../Summary';

function makeProps(obj = {}) {
  return {
    fileUrl: '/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg',
    fileTitle: 'Sample Image',
    content: 'Sample content',
    ...obj
  };
}

test('Summary should render an image if the fileUrl prop is provided', () => {
  const { container } = render(<Summary {...makeProps()}/>);
  expect(container.querySelectorAll('img.element-editor-summary__thumbnail-image')).toHaveLength(1);
  expect(container.querySelector('img.element-editor-summary__thumbnail-image').getAttribute('src')).toBe('/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg');
});

test('Summary should not render an image if the fileUrl prop is not provided', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: ''
    })}
    />
  );
  expect(container.querySelectorAll('img.element-editor-summary__thumbnail-image')).toHaveLength(0);
});

test('Summary should render a content summary if the content is provided', () => {
  const { container } = render(<Summary {...makeProps()}/>);
  expect(container.querySelectorAll('.element-editor-summary__content')).toHaveLength(1);
});

test('Summary should not render a content summary if the content prop is not provided', () => {
  const { container } = render(
    <Summary {...makeProps({
      content: ''
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-summary__content')).toHaveLength(0);
});
