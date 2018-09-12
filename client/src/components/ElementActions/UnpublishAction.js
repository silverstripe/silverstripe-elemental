import React, { Component } from 'react';
import { compose } from 'redux';
import unpublishBlockMutation from 'state/editor/unpublishBlockMutation';
import classNames from 'classnames';
import i18n from 'i18n';

function withUnpublishAction(ElementActions) {
  /**
   * Adds the elemental menu action to unpublish a published block
   */
  class WithUnpublishAction extends Component {
    constructor(props) {
      super(props);

      this.handleUnpublish = this.handleUnpublish.bind(this);
    }

    /**
     * Handle unpublishing of a block, passing the block ID in
     */
    handleUnpublish(event) {
      event.stopPropagation();

      const { id, actions: { handleUnpublishBlock } } = this.props;

      if (handleUnpublishBlock) {
        handleUnpublishBlock(id);
      }
    }


    /**
     * Render the unpublish button if the current state of the button is published
     *
     * @returns {DOMElement|null}
     */
    renderUnpublishButton() {
      const { isPublished } = this.props;
      const unpublishTitle = i18n._t('ElementHeader.UNPUBLISH', 'Unpublish');

      if (!isPublished) {
        return null;
      }

      return (
        <button
          onClick={this.handleUnpublish}
          title={unpublishTitle}
          type="button"
          className={classNames('element-editor__actions-unpublish', 'dropdown-item')}
        >
          {unpublishTitle}
        </button>
      );
    }

    render() {
      const newProps = {
        ...this.props,
        actionButtons: [
          ...this.props.actionButtons || [],
          this.renderUnpublishButton(),
        ],
      };

      return <ElementActions {...newProps} />;
    }
  }

  return compose(unpublishBlockMutation)(WithUnpublishAction);
}

export default withUnpublishAction;
