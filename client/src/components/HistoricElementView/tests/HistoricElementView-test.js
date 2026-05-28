/* global test, expect */
/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';
import ElementalAreaHistoryFactory from '../HistoricElementView';

function makeProps(obj = {}) {
  return {
    className: 'ok',
    data: {
      ElementID: 1,
      ElementType: 'Stub',
      ElementTitle: 'Pretend Element',
      ElementEditLink: 'http://localhost:8080/',
      legend: 'Historic block',
      tag: 'fieldset'
    },
    ...obj
  };
}

const FieldGroupStub = ({ children }) => <div className="test-field-group-stub">{children || 'Group'}</div>;

class FieldGroupClassStub extends React.Component {
  getLegend() {
    return null;
  }

  getClassName() {
    return 'class-field-group-stub';
  }

  render() {
    return <div className={this.getClassName()}>{this.props.children || 'Group'}</div>;
  }
}

const HistoricElementView = ElementalAreaHistoryFactory(FieldGroupStub);

test('HistoricElementView renders', () => {
  const { container } = render(
    <HistoricElementView {...makeProps()}>
      <p>Preview child</p>
    </HistoricElementView>
  );
  const fieldset = container.querySelector('fieldset');
  expect(fieldset.classList).toContain('elemental-area__element--historic-inner');
  expect(fieldset.classList).toContain('field-group-component');
  expect(fieldset.classList).toContain('field-group-component__small-holder');
  expect(fieldset.classList).toContain('ok');
  expect(container.querySelector('legend').textContent).toBe('Historic block');
  expect(container.querySelector('.elemental-preview__detail h3').textContent).toContain('Pretend Element');
  expect(container.querySelector('.elemental-preview__detail small').textContent).toBe('Stub');
  expect(container.querySelector('.elemental-preview__link').href).toBe('http://localhost:8080/');
  expect(container.querySelector('.elemental-preview__link-text').textContent).toBe('Block history');
  expect(container.querySelector('p').textContent).toBe('Preview child');
});

test('HistoricElementView falls back to the injected FieldGroup when there is no historic element', () => {
  const { container } = render(
    <HistoricElementView
      {...makeProps({
        data: {
          tag: 'div',
        },
      })}
    >
      <p>Fallback child</p>
    </HistoricElementView>
  );

  expect(container.querySelector('.test-field-group-stub')).not.toBeNull();
  expect(container.querySelector('.test-field-group-stub').textContent).toBe('Fallback child');
  expect(container.querySelector('.elemental-preview')).toBeNull();
});

const HistoricElementViewClass = ElementalAreaHistoryFactory(FieldGroupClassStub);

test('HistoricElementView preserves the class-based parent path for historic items', () => {
  const { container } = render(
    <HistoricElementViewClass {...makeProps()}>
      <p>Preview child</p>
    </HistoricElementViewClass>
  );

  const fieldset = container.querySelector('fieldset');
  expect(fieldset.classList).toContain('elemental-area__element--historic-inner');
  expect(fieldset.classList).toContain('class-field-group-stub');
  expect(container.querySelector('.elemental-preview')).not.toBeNull();
  expect(container.querySelector('.elemental-preview__detail h3').textContent).toContain('Pretend Element');
  expect(container.querySelector('p').textContent).toBe('Preview child');
});

test('HistoricElementView preserves super.render() fallback for class-based FieldGroup parents', () => {
  const { container } = render(
    <HistoricElementViewClass
      {...makeProps({
        data: {
          tag: 'div',
        },
      })}
    >
      <p>Fallback child</p>
    </HistoricElementViewClass>
  );

  expect(container.querySelector('.class-field-group-stub')).not.toBeNull();
  expect(container.querySelector('.class-field-group-stub').textContent).toBe('Fallback child');
  expect(container.querySelector('.elemental-area__element--historic-inner')).toBeNull();
  expect(container.querySelector('.elemental-preview')).toBeNull();
});
