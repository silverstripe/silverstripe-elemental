/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import prefixClassNames from '../../lib/prefixClassNames';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import i18n from 'i18n';

const classNames = prefixClassNames('element-editor__hover-bar');

/**
 * Render an hoverbar without any state
 */
function StatelessHoverBar({
  AddElementPopoverComponent,
  elementTypes,
  elementId,
  areaId,
  popoverOpen,
  onToggle }) {
  const lineClasses = `${classNames('-line')} font-icon-plus-circled`;
  const label = i18n._t('ElementAddNewButton.ADD_BLOCK', 'Add block');
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
          <span className={lineClasses} />
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
}

/**
 * The HoverBar component used in the context of an ElementEditor allows CMS users to add available
 * elements inline to an ElementalArea.
 */
class HoverBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    const props = {
      ...this.state,
      ...this.props,
      onToggle: this.toggle
    };
    return <StatelessHoverBar {...props} />;
  }
}


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
