import React, { Component, PropTypes } from 'react';
import { Tooltip } from 'reactstrap';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import { elementType } from 'types/elementType';
import i18n from 'i18n';
import classNames from 'classnames';
import { getElementTypeConfig } from 'state/editor/getElementConfig';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      tooltipOpen: false,
    };
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
    const { element: { isLiveVersion, isPublished } } = this.props;

    // No indication required for published elements
    if (isPublished && isLiveVersion) {
      return null;
    }

    let versionStateButtonTitle = '';
    const stateClassNames = ['element-editor-header__version-state'];

    if (!isPublished) {
      versionStateButtonTitle = i18n._t('ElementHeader.STATE_DRAFT', 'Item has not been published yet');
      stateClassNames.push('element-editor-header__version-state--draft');
    }

    if (isPublished && !isLiveVersion) {
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
      previewExpanded,
      ElementActionsComponent,
    } = this.props;

    const {
      inlineEditable: expandable,
      icon: fontIcon,
      editTabs,
      type,
    } = getElementTypeConfig(element.__typename).properties;

    const expandTitle = i18n._t('ElementHeader.EXPAND', 'Show editable fields');
    const expandCaretClasses = classNames(
      'element-editor-header__expand',
      {
        'font-icon-right-open-big': !expandable,
        'font-icon-up-open-big': expandable && previewExpanded,
        'font-icon-down-open-big': expandable && !previewExpanded,
      }
    );

    return (
      <div className="element-editor-header">
        <div className="element-editor-header__info">
          <div className="element-editor-header__icon-container">
            <i className={fontIcon} id={`element-editor-header__icon${element.ID}`} />
            {this.renderVersionedStateMessage()}
            <Tooltip
              placement="top"
              isOpen={this.state.tooltipOpen}
              target={`element-editor-header__icon${element.ID}`}
              toggle={this.toggle}
            >
              {type}
            </Tooltip>
          </div>
          <h3 className="element-editor-header__title">{element.Title}</h3>
        </div>
        <div className="element-editor-header__actions">
          {expandable && <ElementActionsComponent id={element.ID} editTabs={editTabs} />}

          <i className={expandCaretClasses} title={expandTitle} />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  element: elementType,
  ElementActionsComponent: PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func]),
  previewExpanded: PropTypes.bool,
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
