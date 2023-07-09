/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import { Component as Content } from '../Content';

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
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(0);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(1);
});

test('Content should render the InlineEditForm component if the preview is expanded', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
});

test('Content renders even when no content or image is provided', () => {
  const { container } = render(
    <Content {...makeProps({
      fileUrl: '',
      previewExpanded: true
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
});
