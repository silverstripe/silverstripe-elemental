/* global confirm */

import React, { Component, PropTypes } from 'react';
import { Tooltip } from 'reactstrap';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import deleteBlockMutation from 'state/editor/deleteBlockMutation';
import i18n from 'i18n';
import classNames from 'classnames';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCaretClick = this.handleCaretClick.bind(this);

    this.state = {
      tooltipOpen: false,
    };
  }

  /**
   * Handle the deletion of a block, passing the block ID in
   */
  handleDelete(event) {
    event.stopPropagation();

    const { id, actions: { handleDeleteBlock } } = this.props;

    const deleteMessage = i18n._t(
      'ElementHeader.CONFIRM_DELETE',
      'Are you sure you want to delete this block?'
    );

    // eslint-disable-next-line no-alert
    if (handleDeleteBlock && confirm(deleteMessage)) {
      handleDeleteBlock(id);
    }
  }

  /**
   * Handle the opening/closing of the block preview
   */
  handleCaretClick(event) {
    event.stopPropagation();

    // Tell Element
    const { caretClickCallback } = this.props;

    if (caretClickCallback) {
     caretClickCallback(event);
    }
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  /**
   * If inline editing is enabled, render the "more actions" menu
   *
   * @returns {ActionMenuComponent|null}
   */
  renderActionsMenu() {
    const { id, expandable, ActionMenuComponent } = this.props;

    // Don't show the menu when inline editing is not enabled
    if (!expandable) {
      return null;
    }

    const deleteTitle = i18n._t('ElementHeader.DELETE', 'Delete');
    const deleteButtonClassNames = classNames('dropdown-item', 'element-editor__actions-delete');

    return (
      <ActionMenuComponent
        id={`element-editor-actions-${id}`}
        className="element-editor-header__actions-dropdown"
        dropdownMenuProps={{ right: true }}
        toggleCallback={(event) => event.stopPropagation()}
      >
        <button
          onClick={this.handleDelete}
          title={deleteTitle}
          type="button"
          className={deleteButtonClassNames}
        >
          {deleteTitle}
        </button>
      </ActionMenuComponent>
    );
  }

  render() {
    const {
      id,
      title,
      elementType,
      fontIcon,
      expandable,
      previewExpanded,
    } = this.props;

    const expandTitle = i18n._t('ElementHeader.EXPAND', 'Show editable fields');
    const expandButtonClassNames = classNames(
      'dropdown-item',
      'element-editor-header__expand',
      'btn',
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
            <i className={fontIcon} id={`element-editor-header__icon${id}`} />
            <Tooltip
              placement="top"
              isOpen={this.state.tooltipOpen}
              target={`element-editor-header__icon${id}`}
              toggle={this.toggle}
            >
              {elementType}
            </Tooltip>
          </div>
          <h3 className="element-editor-header__title">{title}</h3>
        </div>
        <div className="element-editor-header__actions">
          {this.renderActionsMenu()}

          <button
            onClick={this.handleCaretClick}
            title={expandTitle}
            type="button"
            className={expandButtonClassNames}
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  elementType: PropTypes.string,
  fontIcon: PropTypes.string,
  actions: PropTypes.shape({
    handleDeleteBlock: PropTypes.func.isRequired,
  }),
  ActionMenuComponent: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func]),
  expandable: PropTypes.bool,
  caretClickCallback: PropTypes.func,
  previewExpanded: PropTypes.bool,
};

Header.defaultProps = {
  expandable: true,
};

export { Header as Component };

export default compose(
  inject(
    ['ActionMenu'],
    (ActionMenuComponent) => ({
      ActionMenuComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  ),
  deleteBlockMutation
)(Header);
