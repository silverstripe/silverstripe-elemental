/* global window */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import i18n from 'i18n';
import prefixClassNames from '../../lib/prefixClassNames';

const classNames = prefixClassNames('element-editor__hover-bar');

/**
 * Render an hoverbar without any state
 */
const StatelessHoverBar = ({
  AddElementPopoverComponent,
  elementTypes,
  elementId,
  areaId,
  popoverOpen,
  onToggle
}) => {
  const lineClasses = `${classNames('-line')} font-icon-plus-circled`;
  const label = i18n._t('ElementAddNewButton.ADD_NEW_BLOCK', 'Add new block');
  const btnProps = {
    className: classNames('-area', { '-area--focus': popoverOpen }),
    onClick: onToggle,
    'aria-label': label,
    title: label,
    id: `AddBlockHoverBarArea_${areaId}_${elementId}`
  };
  return (
    <div className={classNames('')} id={`AddBlockHoverBar_${areaId}_${elementId}`}>
      <button {...btnProps}>
        <span className={classNames('-area-inner')}>
          <span className={lineClasses} aria-hidden="true" />
        </span>
      </button>
      <AddElementPopoverComponent
        placement="bottom"
        target={`AddBlockHoverBarArea_${areaId}_${elementId}`}
        isOpen={popoverOpen}
        elementTypes={elementTypes}
        toggle={onToggle}
        container={`#AddBlockHoverBar_${areaId}_${elementId}`}
        areaId={areaId}
        insertAfterElement={elementId}
      />
    </div>
  );
};

/**
 * The HoverBar component used in the context of an ElementEditor allows CMS users to add available
 * elements inline to an ElementalArea.
 */
const HoverBar = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => {
    setPopoverOpen((prevPopoverOpen) => !prevPopoverOpen);
  };

  const newProps = {
    ...props,
    popoverOpen,
    onToggle: toggle
  };

  return <StatelessHoverBar {...newProps} />;
};

HoverBar.propTypes = {
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  elementId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  areaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
export { HoverBar as Component };

export default inject(
  ['AddElementPopover'],
  (AddElementPopoverComponent) => ({
    AddElementPopoverComponent,
  }),
  () => 'ElementEditor.ElementList.HoverBar'
)(HoverBar);
