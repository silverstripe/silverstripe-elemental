/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AbstractAction from '../AbstractAction';

function makeProps(obj = {}) {
  return {
    onClick: () => {},
    title: 'My abstract action',
    disabled: false,
    className: 'foo-bar',
    toggle: false,
    ...obj,
  };
}

test('AbstractAction renders a DropdownItem', () => {
  const { container } = render(<AbstractAction {...makeProps()}/>);
  expect(container.querySelectorAll('.dropdown-item')).toHaveLength(1);
});

test('AbstractAction includes the title text', () => {
  const { container } = render(<AbstractAction {...makeProps()}/>);
  expect(container.querySelector('.dropdown-item').textContent).toBe('My abstract action');
});

test('AbstractAction delegates clicking to the provided handler', () => {
  const onClick = jest.fn();
  const { container } = render(<AbstractAction {...makeProps({ onClick })}/>);
  fireEvent.click(container.querySelector('.dropdown-item'));
  expect(onClick).toHaveBeenCalled();
});

test('AbstractAction adds provided extra classes', () => {
  const { container } = render(<AbstractAction {...makeProps()}/>);
  expect(container.querySelector('.dropdown-item').classList.contains('foo-bar')).toBe(true);
});

test('AbstractAction uses the label prop for the button label if label prop is supplied', () => {
  const { container } = render(
    <AbstractAction {...makeProps({
      title: 'My title',
      label: 'My label'
    })}
    />
  );
  expect(container.querySelector('.dropdown-item').textContent).toBe('My label');
});

test('AbstractAction uses the title prop for the button label if label prop is not supplied', () => {
  const { container } = render(
    <AbstractAction {...makeProps({
      title: 'My title'
    })}
    />
  );
  expect(container.querySelector('.dropdown-item').textContent).toBe('My title');
});
