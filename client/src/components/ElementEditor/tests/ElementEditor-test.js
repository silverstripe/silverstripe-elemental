/* eslint-disable import/no-extraneous-dependencies */
/* global jest, describe, it, expect */

import React from 'react';
import { Component as ElementEditor } from '../ElementEditor';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ElementEditor', () => {
  const ToolbarComponent = () => <div />;
  const ListComponent = () => <div className="elemental-editor__list" />;
  const connectDropTarget = content => content;
  const testElementTypes = [
    {
      name: 'TestElement',
      title: 'Test Block',
      class: 'Test\\Class\\TestElement',
      icon: 'nothing',
      tabs: [
        { title: 'Content', name: 'Main' },
        { title: 'History', name: 'History' }
      ],
    },
    {
      name: 'Aye',
      title: 'Aye',
      class: 'Test\\Class\\Aye',
      icon: 'nothing',
      tabs: [
        { title: 'Content', name: 'Main' },
        { title: 'History', name: 'History' }
      ],
    },
    {
      name: 'Bee',
      title: 'Bee',
      class: 'Test\\Class\\Bee',
      icon: 'nothing',
      tabs: [
        { title: 'Content', name: 'Main' },
        { title: 'History', name: 'History' }
      ],
    },
  ];

  describe('render()', () => {
    it('should render ElementList and Toolbar', () => {
      const wrapper = shallow(
        <ElementEditor
          ToolbarComponent={ToolbarComponent}
          ListComponent={ListComponent}
          areaId={8}
          elementTypes={[testElementTypes[0]]}
          allowedElements={[testElementTypes[0].class]}
          elementalAreaId={1}
          connectDropTarget={connectDropTarget}
        />
      );

      expect(wrapper.name()).toEqual('div');
      expect(wrapper.find(ListComponent)).toHaveLength(1);
      expect(wrapper.find(ToolbarComponent)).toHaveLength(1);
    });

    it('should filter all element types by those allowed for this editor', () => {
      const wrapper = shallow(
        <ElementEditor
          ToolbarComponent={ToolbarComponent}
          ListComponent={ListComponent}
          areaId={8}
          elementTypes={testElementTypes}
          allowedElements={['Test\\Class\\Aye']}
          elementalAreaId={1}
          connectDropTarget={connectDropTarget}
        />
      );

      expect(wrapper.find(ToolbarComponent).props().elementTypes).toEqual([testElementTypes[1]]);
    });

    it('should retain the order specified by the allowed elements config', () => {
      const wrapper = shallow(
        <ElementEditor
          ToolbarComponent={ToolbarComponent}
          ListComponent={ListComponent}
          areaId={8}
          elementTypes={testElementTypes}
          allowedElements={['Test\\Class\\Bee', 'Test\\Class\\TestElement']}
          elementalAreaId={1}
          connectDropTarget={connectDropTarget}
        />
      );

      const names = wrapper.find(ToolbarComponent).props().elementTypes.map(type => type.name);

      expect(names[0]).toBe('Bee');
      expect(names[1]).toBe('TestElement');
    });
  });
});
