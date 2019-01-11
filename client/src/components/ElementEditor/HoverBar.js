/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';

/**
 * The HoverBar component used in the context of an ElementEditor allows CMS users to add available
 * elements inline to an ElementalArea.
 */
class HoverBar extends Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.renderHoverBar = this.renderHoverBar.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      timeoutRef: null,
      delayAreaActive: false,
      instAreaActive: false,
      popoverOpen: false
    };
  }

  /**
   * Handle mouse entering the hover area between two elements. Calculates if mouse entered via
   * 'delayed' or 'instantaneous' hover area and 'activates' these areas with a time out in the
   * former case and instantaneously in the latter.
   *
   * @param event
   */
  handleMouseEnter(event) {
    const { elementId } = this.props;

    // padding of elemental editor + width of font-icon
    const plusButtonWidth = 50;

    const addBlockAreaContainer = window.document.getElementById(`AddBlockArea_${elementId}`);
    const clientWidth = addBlockAreaContainer.clientWidth;
    const offsetLeft = addBlockAreaContainer.getBoundingClientRect().left;
    const mousePos = event.pageX - offsetLeft;
    const delayArea = clientWidth - plusButtonWidth;

    // mouse entered within 'delay' hover area
    if (mousePos < delayArea) {
      const timeoutRef = setTimeout(() => {
        this.setState({
          delayAreaActive: true,
        });
      }, 200);

      this.setState({
        timeoutRef,
      });
    } else {
      // mouse entered within 'instantaneous' hover area
      this.setState({
        instAreaActive: true,
      });
    }
  }

  /**
   * Handles mouse leaving the hover area between two elements.
   * 'Deactivates' both the 'delayed' and 'instantaneous' hover area sections, unless the popover
   * is rendered.
   *
   */
  handleMouseLeave() {
    clearTimeout(this.state.timeoutRef);

    if (this.state.popoverOpen) {
      return;
    }
    this.setState({ delayAreaActive: false, instAreaActive: false });
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  /**
   * Render a hover bar. Styling depends on the hover area section that triggered this function.
   *
   * @returns {DOMElement}
   */
  renderHoverBar(calledInstantaneously) {
    const { elementId } = this.props;

    const hoverBarClassNames = classNames(
      'font-icon-plus-circled',
      'element-editor__add-block-hover-bar',
      {
        'element-editor__add-block-hover-bar--delay': !calledInstantaneously,
        'element-editor__add-block-hover-bar--inst': calledInstantaneously,
      }
    );

    return (
      <button
        id={`AddBlockHoverBar_${elementId}`}
        className={hoverBarClassNames}
        onClick={this.toggle}
      />
    );
  }

  /**
   * Render the hover bar container and the hover area. Conditionally render the hover bar and the
   * injected popover.
   *
   * @returns {DOMElement}
   */
  render() {
    const {
      AddElementPopoverComponent,
      elementTypes,
      elementId,
      areaId,
    } = this.props;
    const { popoverOpen } = this.state;

    return (
      <div className="element-editor__add-block-area-container" id={`AddBlockArea_${elementId}`}>
        <div
          className="element-editor__add-block-area"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {/* render the hover bar in the corresponding style */}
          {
            (this.state.delayAreaActive && this.renderHoverBar(false)) ||
            (this.state.instAreaActive && this.renderHoverBar(true))
          }
          {/* render the popover */}
          {(this.state.delayAreaActive || this.state.instAreaActive) &&
            <AddElementPopoverComponent
              placement="bottom-end"
              target={`AddBlockHoverBar_${elementId}`}
              isOpen={popoverOpen}
              elementTypes={elementTypes}
              toggle={this.toggle}
              container={`#AddBlockArea_${elementId}`}
              areaId={areaId}
              insertAfterElement={elementId}
            />
          }
        </div>
      </div>
    );
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
