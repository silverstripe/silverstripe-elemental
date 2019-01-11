import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { inject } from 'lib/Injector';
import i18n from 'i18n';
import classNames from 'classnames';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { isDirty } from 'redux-form';
import getFormState from 'lib/getFormState';

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

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  /**
   * Renders a message indicating the current versioned state of the element
   *
   * @returns {DOMElement|null}
   */
  renderVersionedStateMessage() {
    const {
      element: { IsLiveVersion: isLiveVersion, IsPublished: isPublished },
      formDirty,
    } = this.props;

    // No indication required for published elements
    if (!formDirty && isPublished && isLiveVersion) {
      return null;
    }

    let versionStateButtonTitle = '';
    const stateClassNames = ['element-editor-header__version-state'];

    if (formDirty) {
      versionStateButtonTitle = i18n._t('ElementHeader.STATE_UNSAVED', 'Item has unsaved changes');
      stateClassNames.push('element-editor-header__version-state--unsaved');
    } else if (!isPublished) {
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

    const noTitle = i18n.inject(
      i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
      { type: type.title }
    );
    const titleClasses = classNames({
      'element-editor-header__title': true,
      'element-editor-header__title--none': !element.Title,
    });
    const expandTitle = i18n._t('ElementHeader.EXPAND', 'Show editable fields');
    const containerClasses = classNames(
      'element-editor-header', {
        'element-editor-header--simple': simple,
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
    const blockIconId = `element-icon-${element.ID}`;

    return (
      <div className={containerClasses}>
        <div className="element-editor-header__drag-handle">
          <i className="font-icon-drag-handle" />
        </div>
        <div className="element-editor-header__info">
          <div className="element-editor-header__icon-container">
            <i className={type.icon} id={blockIconId} />
            {this.renderVersionedStateMessage()}
            {!simple && <Tooltip
              placement="top"
              isOpen={this.state.tooltipOpen && !disableTooltip}
              target={blockIconId}
              toggle={this.toggle}
            >
              {type.title}
            </Tooltip>}
          </div>
          <h3 className={titleClasses}>{element.Title || noTitle}</h3>
        </div>
        {!simple && <div className="element-editor-header__actions">
          {expandable &&
            <div
              role="none"
              onClick={(event) => event.stopPropagation()}
            >
              <ElementActionsComponent
                element={element}
                areaId={areaId}
                activeTab={activeTab}
                editTabs={type.editTabs}
                handleEditTabsClick={handleEditTabsClick}
              />
            </div>
          }
          <i className={expandCaretClasses} title={expandTitle} />
        </div>}
      </div>
    );
  }
}

Header.propTypes = {
  element: elementType.isRequired,
  type: elementTypeType.isRequired,
  areaId: PropTypes.number,
  activeTab: PropTypes.string,
  simple: PropTypes.bool,
  ElementActionsComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  previewExpanded: PropTypes.bool,
  disableTooltip: PropTypes.bool,
  formDirty: PropTypes.bool,
};

Header.defaultProps = {
  expandable: true,
};

function mapStateToProps(state, ownProps) {
  const formName = loadElementFormStateName(ownProps.element.ID);

  return {
    formDirty: isDirty(`element.${formName}`, getFormState)(state),
  };
}

export { Header as Component };

export default compose(
  inject(
    ['ElementActions'],
    (ElementActionsComponent) => ({
      ElementActionsComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  ),
  connect(mapStateToProps)
)(Header);
