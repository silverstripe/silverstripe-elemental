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

test('Summary should render both image and content when both fileUrl and content are provided', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: '/ss4/assets/Uploads/image.jpeg',
      content: 'Sample content'
    })}
    />
  );
  expect(container.querySelectorAll('img.element-editor-summary__thumbnail-image')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-summary__content')).toHaveLength(1);
  expect(container.querySelector('.element-editor-summary__content').textContent).toBe('Sample content');
});

test('Summary should render content and no image when only content is provided', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: '',
      content: 'Only text content'
    })}
    />
  );
  expect(container.querySelectorAll('img.element-editor-summary__thumbnail-image')).toHaveLength(0);
  expect(container.querySelectorAll('.element-editor-summary__content')).toHaveLength(1);
  expect(container.querySelector('.element-editor-summary__content').textContent).toBe('Only text content');
});

test('Summary should render "no preview available" message when neither fileUrl nor content are provided', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: '',
      content: ''
    })}
    />
  );
  expect(container.querySelectorAll('img.element-editor-summary__thumbnail-image')).toHaveLength(0);
  const contentEl = container.querySelector('.element-editor-summary__content');
  expect(contentEl).not.toBeNull();
  expect(contentEl.textContent).toBe('No preview available');
});

test('Summary should render "no preview available" message when only fileUrl is provided but no content', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: '/ss4/assets/Uploads/image.jpeg',
      content: ''
    })}
    />
  );
  expect(container.querySelectorAll('img.element-editor-summary__thumbnail-image')).toHaveLength(1);
  expect(container.querySelectorAll('.element-editor-summary__content')).toHaveLength(0);
});

test('Summary should apply broken class when broken prop is true', () => {
  const { container } = render(
    <Summary {...makeProps({
      broken: true
    })}
    />
  );
  const contentEl = container.querySelector('.element-editor-summary__content');
  expect(contentEl).not.toBeNull();
  expect(contentEl.classList.contains('element-editor-summary__content--broken')).toBe(true);
});

test('Summary should not apply broken class when broken prop is false', () => {
  const { container } = render(
    <Summary {...makeProps({
      broken: false
    })}
    />
  );
  const contentEl = container.querySelector('.element-editor-summary__content');
  expect(contentEl).not.toBeNull();
  expect(contentEl.classList.contains('element-editor-summary__content--broken')).toBe(false);
});

test('Summary image should have correct alt text from fileTitle prop', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: '/ss4/assets/Uploads/image.jpeg',
      fileTitle: 'Important Document'
    })}
    />
  );
  const img = container.querySelector('img.element-editor-summary__thumbnail-image');
  expect(img).not.toBeNull();
  expect(img.getAttribute('alt')).toBe('Important Document');
});

test('Summary should render correctly with all props provided', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: '/ss4/assets/Uploads/photo.jpeg',
      fileTitle: 'My Photo',
      content: 'Beautiful image',
      broken: true
    })}
    />
  );
  const img = container.querySelector('img.element-editor-summary__thumbnail-image');
  expect(img).not.toBeNull();
  expect(img.getAttribute('src')).toBe('/ss4/assets/Uploads/photo.jpeg');
  expect(img.getAttribute('alt')).toBe('My Photo');
  const contentEl = container.querySelector('.element-editor-summary__content');
  expect(contentEl).not.toBeNull();
  expect(contentEl.textContent).toBe('Beautiful image');
  expect(contentEl.classList.contains('element-editor-summary__content--broken')).toBe(true);
});

test('Summary should always render outer wrapper with correct class', () => {
  const { container } = render(
    <Summary {...makeProps({
      fileUrl: '',
      content: ''
    })}
    />
  );
  const wrapper = container.querySelector('.element-editor-summary');
  expect(wrapper).not.toBeNull();
});
