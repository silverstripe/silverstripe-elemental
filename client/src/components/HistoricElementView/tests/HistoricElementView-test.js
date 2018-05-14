/* global jest, describe, beforeEach, it, expect */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ElementalAreaHistoryFactory from '../HistoricElementView';

describe('HistoricElementView', () => {
  class FieldGroupStub extends React.Component {
    getLegend() {
      return 'nah';
    }
    getClassName() {
      return 'ok';
    }
    render() {
      return <div>Group</div>;
    }
  }
  const datumSet = {
    ElementType: 'Stub',
    ElementTitle: 'Pretend Element',
    ElementEditLink: 'http://localhost:8080/'
  };
  const HistoricElementView = ElementalAreaHistoryFactory(FieldGroupStub);
  let history = null;

  describe('render', () => {
    beforeEach(() => {
      history = ReactTestUtils.renderIntoDocument(
        <HistoricElementView data={datumSet} />
      );
    });

    it('The header should feature the Element type', () => {
      const type = ReactTestUtils.findRenderedDOMComponentWithTag(history, 'small').textContent;
      expect(type).toBeTruthy();
      expect(type).toEqual('Stub');
    });

    it('should should list the Element\'s title', () => {
      const title = ReactTestUtils.findRenderedDOMComponentWithClass(history, 'elemental-preview__detail').textContent;
      expect(title).toBeTruthy();
      expect(title).toMatch(/^Pretend Element\b/);
    });

    it('should should have a link in the header', () => {
      const link = ReactTestUtils.findRenderedDOMComponentWithClass(history, 'elemental-preview__link');
      expect(link).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.textContent).toEqual('View block');
    });
  });
});
