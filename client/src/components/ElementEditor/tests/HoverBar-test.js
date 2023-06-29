/* eslint-disable import/no-extraneous-dependencies */
/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import { Component as HoverBar } from '../HoverBar';

function makeProps(obj = {}) {
  return {
    key: 0,
    areaId: 0,
    elementId: 0,
    elementTypes: [
      {
        name: 'Main',
        title: 'Content',
        icon: '',
        tabs: ['', '']
      }
    ],
    AddElementPopoverComponent: () => <div />,
    ...obj
  };
}

const hoverBarName = 'AddBlockHoverBar';
const hoverBarAreaName = 'AddBlockHoverBarArea';

test('HoverBar renders top HoverBarComponent', () => {
  [
    { areaId: 1, elementId: 0 },
    { areaId: 2, elementId: 3 },
  ].forEach(({ areaId, elementId }) => {
    const { container } = render(
      <HoverBar {...makeProps({
        areaId,
        elementId,
        key: elementId
      })}
      />
    );
    const hoverBar = container.querySelector('.element-editor__hover-bar');
    const hoverBarArea = container.querySelector('button.element-editor__hover-bar-area');
    expect(hoverBar.getAttribute('id')).toBe(`${hoverBarName}_${areaId}_${elementId}`);
    expect(hoverBarArea.getAttribute('id')).toBe(`${hoverBarAreaName}_${areaId}_${elementId}`);
  });
});
