/* global jest, test, describe, beforeEach, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import ElementalAreaHistoryFactory from '../HistoricElementView';

function makeProps(obj = {}) {
  return {
    data: {
      ElementID: 1,
      ElementType: 'Stub',
      ElementTitle: 'Pretend Element',
      ElementEditLink: 'http://localhost:8080/',
      tag: 'div'
    },
    ...obj
  };
}

class FieldGroupStub extends React.Component {
  getLegend() {
    return 'nah';
  }

  getClassName() {
    return 'ok';
  }

  render() {
    return <div className="test-field-group-stub">Group</div>;
  }
}

const HistoricElementView = ElementalAreaHistoryFactory(FieldGroupStub);

test('HistoricElementView renders', () => {
  const { container } = render(<HistoricElementView {...makeProps()}/>);
  expect(container.querySelectorAll('.elemental-area__element--historic-inner.ok')).toHaveLength(1);
  expect(container.querySelector('.elemental-preview__detail h3').textContent).toContain('Pretend Element');
  expect(container.querySelector('.elemental-preview__detail small').textContent).toBe('Stub');
  expect(container.querySelector('.elemental-preview__link').href).toBe('http://localhost:8080/');
  expect(container.querySelector('.elemental-preview__link-text').textContent).toBe('Block history');
});
