/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import DragPositionIndicator from '../DragPositionIndicator';

test('DragPositionIndicator renders the main container', () => {
  const { container } = render(<DragPositionIndicator />);
  const dragIndicator = container.querySelector('.elemental-editor-drag-indicator');
  expect(dragIndicator).not.toBeNull();
});

test('DragPositionIndicator renders the ball element', () => {
  const { container } = render(<DragPositionIndicator />);
  const ball = container.querySelector('.elemental-editor-drag-indicator__ball');
  expect(ball).not.toBeNull();
});

test('DragPositionIndicator renders ball as direct child of drag indicator', () => {
  const { container } = render(<DragPositionIndicator />);
  const dragIndicator = container.querySelector('.elemental-editor-drag-indicator');
  const ball = dragIndicator.querySelector('.elemental-editor-drag-indicator__ball');
  expect(ball).not.toBeNull();
  expect(ball.parentElement).toBe(dragIndicator);
});

test('DragPositionIndicator renders a single div container', () => {
  const { container } = render(<DragPositionIndicator />);
  const dragIndicators = container.querySelectorAll('.elemental-editor-drag-indicator');
  expect(dragIndicators).toHaveLength(1);
});

test('DragPositionIndicator renders a single ball element', () => {
  const { container } = render(<DragPositionIndicator />);
  const balls = container.querySelectorAll('.elemental-editor-drag-indicator__ball');
  expect(balls).toHaveLength(1);
});

test('DragPositionIndicator renders without any text content', () => {
  const { container } = render(<DragPositionIndicator />);
  const dragIndicator = container.querySelector('.elemental-editor-drag-indicator');
  expect(dragIndicator.textContent).toBe('');
});

test('DragPositionIndicator renders without any id attribute', () => {
  const { container } = render(<DragPositionIndicator />);
  const dragIndicator = container.querySelector('.elemental-editor-drag-indicator');
  expect(dragIndicator.id).toBe('');
});

test('DragPositionIndicator renders with only expected child elements', () => {
  const { container } = render(<DragPositionIndicator />);
  const dragIndicator = container.querySelector('.elemental-editor-drag-indicator');
  expect(dragIndicator.children).toHaveLength(1);
  expect(dragIndicator.children[0].className).toBe('elemental-editor-drag-indicator__ball');
});

test('DragPositionIndicator can be rendered multiple times independently', () => {
  const { container } = render(
    <div>
      <DragPositionIndicator />
      <DragPositionIndicator />
      <DragPositionIndicator />
    </div>
  );
  const dragIndicators = container.querySelectorAll('.elemental-editor-drag-indicator');
  const balls = container.querySelectorAll('.elemental-editor-drag-indicator__ball');
  expect(dragIndicators).toHaveLength(3);
  expect(balls).toHaveLength(3);
});
