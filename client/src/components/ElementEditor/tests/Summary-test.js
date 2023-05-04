/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import Summary from '../Summary';
import { render } from '@testing-library/react';

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
  expect(container.querySelector('.element-editor-summary__thumbnail-image')).not.toBeNull();
});

test('Summary should not render an image if the fileUrl prop is not provided', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: ''
    })}
    />
  );
  expect(container.querySelector('.element-editor-summary__thumbnail-image')).toBeNull();
});

test('Summary should render a content summary if the content is provided', () => {
  const { container } = render(<Summary {...makeProps()}/>);
  expect(container.querySelector('.element-editor-summary__content')).not.toBeNull();
});

test('Summary should not render a content summary if the content prop is not provided', () => {
  const { container } = render(
    <Summary {...makeProps({
      content: ''
    })}
    />
  );
  expect(container.querySelector('.element-editor-summary__content')).toBeNull();
});
