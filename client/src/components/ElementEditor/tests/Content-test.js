/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import classnames from 'classnames';
import { Component as Content } from '../Content';

function makeProps(obj = {}) {
  return {
    fileUrl: '/ss4/assets/Uploads/c70617f2e4/sample__FillWzEwMCwxMDBd.jpeg',
    fileTitle: '',
    content: '',
    previewExpanded: false,
    ensureFormRendered: false,
    formHasRendered: false,
    InlineEditFormComponent: (props) => {
      const className = classnames({
        'test-inline-edit-form': true,
        ...props.extraClass
      });
      return <div className={className} />;
    },
    SummaryComponent: () => <div className="test-summary" />,
    ...obj,
  };
}

test('Content component - previewExpanded is true, ensureFormRendered is false, formHasRendered is false', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true,
      ensureFormRendered: false,
      formHasRendered: false,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(0);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(0);
});

test('Content component - previewExpanded is true, ensureFormRendered is true, formHasRendered is false', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true,
      ensureFormRendered: true,
      formHasRendered: false,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(0);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(0);
});

test('Content component - previewExpanded is true, ensureFormRendered is true, formHasRendered is true', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: true,
      ensureFormRendered: true,
      formHasRendered: true,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(0);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(0);
});

test('Content component - previewExpanded is false, ensureFormRendered is true, formHasRendered is false', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: false,
      ensureFormRendered: true,
      formHasRendered: false,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(1);
});

test('Content component - previewExpanded is false, ensureFormRendered is true, formHasRendered is true', () => {
  const { container } = render(
    <Content {...makeProps({
      previewExpanded: false,
      ensureFormRendered: true,
      formHasRendered: true,
    })}
    />
  );
  expect(container.querySelectorAll('.element-editor-content')).toHaveLength(1);
  expect(container.querySelectorAll('.test-summary')).toHaveLength(1);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--collapsed')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-editform--rendered-not-visible')).toHaveLength(1);
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
  expect(container.querySelectorAll('.test-summary')).toHaveLength(0);
  expect(container.querySelectorAll('.test-inline-edit-form')).toHaveLength(1);
});
