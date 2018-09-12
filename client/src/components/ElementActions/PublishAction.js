import React, { Component } from 'react';
import { compose } from 'redux';
import publishBlockMutation from 'state/editor/publishBlockMutation';
import classNames from 'classnames';
import i18n from 'i18n';

function withPublishAction(ElementActions) {
  /**
   * Adds the elemental menu action to publish a draft/modified block
   */
  class WithPublishAction extends Component {
    constructor(props) {
      super(props);

      this.handlePublish = this.handlePublish.bind(this);
    }

    /**
     * Handle the publication of a block, passing the block ID and version number in
     */
    handlePublish(event) {
      event.stopPropagation();

      const { id, version, actions: { handlePublishBlock } } = this.props;

      if (handlePublishBlock) {
        handlePublishBlock(id, 'DRAFT', 'LIVE', version);
      }
    }

    /**
     * Render the publish button, if the current state of the button is not yet published
     *
     * @returns {DOMElement|null}
     */
    renderPublishButton() {
      const { isLiveVersion } = this.props;

      const publishTitle = i18n._t('PublishAction.PUBLISH', 'Publish');

      if (isLiveVersion) {
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

    render() {
      const newProps = {
        ...this.props,
        actionButtons: [
          ...this.props.actionButtons || [],
          this.renderPublishButton(),
        ],
      };

      return <ElementActions {...newProps} />;
    }
  }

  return compose(publishBlockMutation)(WithPublishAction);
}

export default withPublishAction;
