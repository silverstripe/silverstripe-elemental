import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import i18n from 'i18n';
import classNames from 'classnames';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      tooltipOpen: false,
    };
  }

  componentDidUpdate() {
    const { tooltipOpen } = this.state;
    const { disableTooltip } = this.props;

    if (tooltipOpen && disableTooltip) {
      // This addresses an issue where the tooltip will stick around after dragging. The
      // ability to have a tooltip is back (props.disableTooltip) but the old state remains.
      // Using `setState` in `componentDidUpdate` is dangerous but is okay within a reasonable
      // condition that avoids the (potential) infinite loop.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        tooltipOpen: false
      });
    }
  }

  /**
   * Returns the title for this block
   *
   * @param {Object} element
   * @param {Object} type
   * @returns {string}
   */
  getBlockTitle(element, type) {
    if (type.broken) {
      return i18n.inject(
        i18n._t('ElementHeader.BROKEN', 'This element is of obsolete type {type}.'),
        { type: type.obsoleteClassName }
      );
    }
    if (element.title) {
      return element.title;
    }
    return i18n.inject(
      i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
      { type: type.title }
    );
  }

  toggle() {
    this.setState((prevState) => ({
      tooltipOpen: !prevState.tooltipOpen
    }));
  }

  /**
   * Renders a message indicating the current versioned state of the element
   *
   * @returns {DOMElement|null}
   */
  renderVersionedStateMessage() {
    const {
      element: { isLiveVersion, isPublished },
    } = this.props;

    // No indication required for published elements
    if (isPublished && isLiveVersion) {
      return null;
    }

    let versionStateButtonTitle = '';
    const stateClassNames = ['element-editor-header__version-state'];

    if (!isPublished) {
      versionStateButtonTitle = i18n._t('ElementHeader.STATE_DRAFT', 'Item has not been published yet');
      stateClassNames.push('element-editor-header__version-state--draft');
    } else if (!isLiveVersion) {
      versionStateButtonTitle = i18n._t('ElementHeader.STATE_MODIFIED', 'Item has unpublished changes');
      stateClassNames.push('element-editor-header__version-state--modified');
    }

    return (
      <span
        className={classNames(stateClassNames)}
        title={versionStateButtonTitle}
      />
    );
  }

  renderStatusFlagBadges() {
    const statusFlags = this.props.element.statusFlags;
    if (!statusFlags) {
      return null;
    }
    const badges = [];
    // eslint-disable-next-line no-restricted-syntax
    for (let [cssClasses, data] of Object.entries(statusFlags)) {
      cssClasses = `badge status-${cssClasses}`;
      if (typeof data === 'string') {
        data = { text: data };
      }
      if (!data.title) {
        data.title = '';
      }
      badges.push(<span key={cssClasses} className={cssClasses} title={data.title}>{data.text}</span>);
    }
    return badges;
  }

  render() {
    const {
      element,
      type,
      areaId,
      previewExpanded,
      simple,
      disableTooltip,
      activeTab,
      expandable,
      ElementActionsComponent,
      handleEditTabsClick,
    } = this.props;

    const title = this.getBlockTitle(element, type);
    const titleClasses = classNames({
      'element-editor-header__title': true,
      'element-editor-header__title--none': !element.title,
    });
    const expandTitle = i18n._t('ElementHeader.EXPAND', 'Show editable fields');
    const containerClasses = classNames(
      'element-editor-header', {
        'element-editor-header--simple': simple,
      }
    );
    const iconContainerClasses = classNames(
      'element-editor-header__icon-container',
      {
        'element-editor-header__icon-container--broken': type.broken,
      }
    );
    const expandCaretClasses = classNames(
      'element-editor-header__expand',
      {
        'font-icon-right-open-big': !expandable,
        'font-icon-up-open-big': expandable && previewExpanded,
        'font-icon-down-open-big': expandable && !previewExpanded,
      }
    );
    const blockIconId = `element-icon-${element.id}`;

    const content = (
      <div className={containerClasses}>
        <div className="element-editor-header__drag-handle">
          <i className="font-icon-drag-handle" />
        </div>
        <div className="element-editor-header__info">
          <div className={iconContainerClasses}>
            <i className={type.icon} id={blockIconId} />
            {this.renderVersionedStateMessage()}
            {!type.broken && !simple && <Tooltip
              placement="top"
              isOpen={this.state.tooltipOpen && !disableTooltip}
              target={blockIconId}
              toggle={this.toggle}
            >
              {type.title}
            </Tooltip>}
          </div>
          <h3 className={titleClasses}>{title}</h3>
          {this.renderStatusFlagBadges()}
        </div>
        {!simple && <div className="element-editor-header__actions">
          <div role="none" onClick={(event) => event.stopPropagation()}>
            <ElementActionsComponent
              element={element}
              type={type}
              areaId={areaId}
              activeTab={activeTab}
              editTabs={type.editTabs}
              handleEditTabsClick={handleEditTabsClick}
              expandable={expandable}
            />
          </div>
          {!type.broken && <i className={expandCaretClasses} title={expandTitle} />}
        </div>}
      </div>
    );

    return content;
  }
}

Header.propTypes = {
  element: elementType.isRequired,
  type: elementTypeType.isRequired,
  areaId: PropTypes.number,
  activeTab: PropTypes.string,
  simple: PropTypes.bool,
  ElementActionsComponent: PropTypes.elementType,
  previewExpanded: PropTypes.bool,
  disableTooltip: PropTypes.bool,
};

Header.defaultProps = {
  expandable: true,
};

export { Header as Component };

export default compose(
  inject(
    ['ElementActions'],
    (ElementActionsComponent) => ({
      ElementActionsComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  )
)(Header);
