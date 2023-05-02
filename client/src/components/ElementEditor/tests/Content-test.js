/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { Component as Content } from '../Content';
import { render } from '@testing-library/react';

function makeProps(obj = {}) {
  return {
    fileUrl: '/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg',
    fileTitle: '',
    content: '',
    previewExpanded: false,
    InlineEditFormComponent: () => <div className="test-inline-edit-form" />,
    SummaryComponent: () => <div className="test-summary" />,
    ...obj,
  };
}

test('Content should render the Summary component if the preview is not expanded', () => {
  const { container } = render(<Content {...makeProps()} />);
  expect(container.querySelector('.element-editor-content')).not.toBeNull();
  expect(container.querySelector('.test-inline-edit-form')).toBeNull();
  expect(container.querySelector('.test-summary')).not.toBeNull();
});

test('Content should render the InlineEditForm component if the preview is expanded', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true
    })}
    />
  );
  expect(container.querySelector('.element-editor-content')).not.toBeNull();
  expect(container.querySelector('.test-inline-edit-form')).not.toBeNull();
  expect(container.querySelector('.test-summary')).toBeNull();
});

test('Content returns a div when no content or image is provided', () => {
  const { container } = render(
    <Content {...makeProps({
      fileUrl: '',
      previewExpanded: true
    })}
    />
  );
  expect(container.querySelector('.element-editor-content')).not.toBeNull();
  expect(container.querySelector('.test-inline-edit-form')).not.toBeNull();
  expect(container.querySelector('.test-summary')).toBeNull();
});
