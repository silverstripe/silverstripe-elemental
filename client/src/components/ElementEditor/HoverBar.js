/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import i18n from 'i18n';

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
  const hoverBarClassNames = classNames('font-icon-plus-circled', 'hover-bar__line');
  const areaClasses = classNames(
    'hover-bar__area',
    { 'hover-bar__area--focus': popoverOpen }
  );
  const label = i18n._t('ElementAddNewButton.ADD_BLOCK', 'Add block');

  return (
    <div className="hover-bar" id={`AddBlockArea_${elementId}`}>
      <button className={areaClasses} onClick={onToggle} aria-label={label} title={label}>
        <span className="hover-bar__area-inner">
          <span id={`AddBlockHoverBar_${elementId}`} className={hoverBarClassNames} />
        </span>
      </button>
      <AddElementPopoverComponent
        placement="bottom"
        target={`AddBlockHoverBar_${elementId}`}
        isOpen={popoverOpen}
        elementTypes={elementTypes}
        toggle={onToggle}
        container={`#AddBlockArea_${elementId}`}
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
