/* global confirm */
import React, { Component } from 'react';
import { compose } from 'redux';
import archiveBlockMutation from 'state/editor/archiveBlockMutation';
import classNames from 'classnames';
import i18n from 'i18n';

function withArchiveAction(ElementActions) {
  /**
   * Adds the elemental menu action to archive a block of any state
   */
  class WithArchiveAction extends Component {
    constructor(props) {
      super(props);

      this.handleArchive = this.handleArchive.bind(this);
    }

    /**
     * Handle the deletion of a block, passing the block ID in
     */
    handleArchive(event) {
      event.stopPropagation();

      const { id, isPublished, actions: { handleArchiveBlock } } = this.props;

      let archiveMessage = i18n._t(
        'ArchiveAction.CONFIRM_DELETE',
        'Are you sure you want to send this block to the archive?'
      );

      if (isPublished) {
        archiveMessage = i18n._t(
          'ArchiveAction.CONFIRM_DELETE_AND_UNPUBLISH',
          'Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?'
        );
      }

      // eslint-disable-next-line no-alert
      if (handleArchiveBlock && confirm(archiveMessage)) {
        handleArchiveBlock(id);
      }
    }

    /**
     * Render the archive button
     *
     * @returns {DOMElement|null}
     */
    renderArchiveAction() {
      const archiveTitle = i18n._t('ArchiveAction.ARCHIVE', 'Archive');

      return (
        <button
          onClick={this.handleArchive}
          title={archiveTitle}
          type="button"
          className={classNames('element-editor__actions-archive', 'dropdown-item')}
        >
          {archiveTitle}
        </button>
      );
    }

    render() {
      const newProps = {
        ...this.props,
        actionButtons: [
          ...this.props.actionButtons || [],
          this.renderArchiveAction(),
        ],
      };

      return <ElementActions {...newProps} />;
    }
  }

  return compose(archiveBlockMutation)(WithArchiveAction);
}

export default withArchiveAction;
