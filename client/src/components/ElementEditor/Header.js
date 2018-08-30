/* global confirm */

import React, { Component, PropTypes } from 'react';
import { Tooltip } from 'reactstrap';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import archiveBlockMutation from 'state/editor/archiveBlockMutation';
import publishBlockMutation from 'state/editor/publishBlockMutation';
import i18n from 'i18n';
import classNames from 'classnames';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleArchive = this.handleArchive.bind(this);
    this.handleCaretClick = this.handleCaretClick.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.renderActionsMenu = this.renderActionsMenu.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      tooltipOpen: false,
    };
  }

  /**
   * Handle the deletion of a block, passing the block ID in
   */
  handleArchive(event) {
    event.stopPropagation();

    const { id, isPublished, actions: { handleArchiveBlock } } = this.props;

    let archiveMessage = i18n._t(
      'ElementHeader.CONFIRM_DELETE',
      'Are you sure you want to send this block to the archive?'
    );

    if (isPublished) {
      archiveMessage = i18n._t(
        'ElementHeader.CONFIRM_DELETE_AND_UNPUBLISH',
        'Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?'
      );
    }

    // eslint-disable-next-line no-alert
    if (handleArchiveBlock && confirm(archiveMessage)) {
      handleArchiveBlock(id);
    }
  }

  /**
   * Handle the publication of a block, passing the block ID and version number in
   */
  handlePublish(event) {
    event.stopPropagation();

    const { id, version, actions: { handlePublishBlock } } = this.props;

    // eslint-disable-next-line no-alert
    if (handlePublishBlock) {
      // blockId, fromStage, toStage, fromVersion
      handlePublishBlock(id, 'DRAFT', 'LIVE', version);
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
   * Render the publish button, if the current state of the button is not yet published
   *
   * @returns {DOMElement|null}
   */
  renderPublishButton() {
    const { isPublished } = this.props;

    const publishTitle = i18n._t('ElementHeader.PUBLISH', 'Publish');

    if (isPublished) {
      return null;
    }

    return (
      <button
        onClick={this.handlePublish}
        title={publishTitle}
        type="button"
        className={classNames('element-editor__actions-publish', 'dropdown-item')}
      >
        {publishTitle}
      </button>
    );
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

    const archiveTitle = i18n._t('ElementHeader.ARCHIVE', 'Archive');

    return (
      <ActionMenuComponent
        id={`element-editor-actions-${id}`}
        className={'element-editor-header__actions-dropdown'}
        dropdownMenuProps={{ right: true }}
        toggleCallback={(event) => event.stopPropagation()}
      >
        <button
          onClick={this.handleArchive}
          title={archiveTitle}
          type="button"
          className={classNames('element-editor__actions-archive', 'dropdown-item')}
        >
          {archiveTitle}
        </button>

        {this.renderPublishButton()}

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
  id: PropTypes.string,
  title: PropTypes.string,
  version: PropTypes.number,
  isPublished: PropTypes.bool,
  elementType: PropTypes.string,
  fontIcon: PropTypes.string,
  actions: PropTypes.shape({
    handlePublishBlock: PropTypes.func,
    handleArchiveBlock: PropTypes.func.isRequired,
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
  publishBlockMutation,
  archiveBlockMutation
)(Header);
