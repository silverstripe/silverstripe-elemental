import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'lib/Injector';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { isDirty } from 'redux-form';
import getFormState from 'lib/getFormState';

class Content extends PureComponent {
  render() {
    const {
      id,
      fileUrl,
      fileTitle,
      content,
      previewExpanded,
      InlineEditFormComponent,
      SummaryComponent,
      activeTab,
      onFormInit,
      handleLoadingError,
      formDirty,
      broken,
      onFormSchemaFetchResponse,
      onFormSchemaSubmitResponse,
      ensureFormRendered,
      formHasRendered,
    } = this.props;

    const notVisible = !previewExpanded && (ensureFormRendered || formHasRendered);
    const extraClass = {
      'element-editor-editform--collapsed': !previewExpanded,
      'element-editor-editform--rendered-not-visible': notVisible,
    };

    return (
      <div className="element-editor-content">
        {!previewExpanded &&
          // Show summary
          <SummaryComponent
            content={content}
            fileUrl={fileUrl}
            fileTitle={fileTitle}
            broken={broken}
          />
        }
        {(previewExpanded || ensureFormRendered || formHasRendered) &&
          // Show inline editable fields
          <InlineEditFormComponent
            extraClass={extraClass}
            onClick={(event) => event.stopPropagation()}
            elementId={id}
            activeTab={activeTab}
            onFormInit={onFormInit}
            handleLoadingError={handleLoadingError}
            onFormSchemaFetchResponse={onFormSchemaFetchResponse}
            onFormSchemaSubmitResponse={onFormSchemaSubmitResponse}
            notVisible={notVisible}
          />
        }
        {formDirty &&
          <input
            type="hidden"
            name="change-tracker"
            className="element-form-dirty-state"
            value="1"
          />
        }
      </div>
    );
  }
}

Content.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  fileUrl: PropTypes.string,
  fileTitle: PropTypes.string,
  previewExpanded: PropTypes.bool,
  SummaryComponent: PropTypes.elementType,
  InlineEditFormComponent: PropTypes.elementType,
  handleLoadingError: PropTypes.func,
  broken: PropTypes.bool,
  onFormSchemaFetchResponse: PropTypes.func,
  onFormSchemaSubmitResponse: PropTypes.func,
  ensureFormRendered: PropTypes.bool,
  formHasRendered: PropTypes.bool,
};

Content.defaultProps = {};

function mapStateToProps(state, ownProps) {
  const formName = loadElementFormStateName(ownProps.id);

  return {
    formDirty: isDirty(`element.${formName}`, getFormState)(state),
  };
}

export { Content as Component };

export default compose(
  inject(
    ['ElementSummary', 'ElementInlineEditForm'],
    (SummaryComponent, InlineEditFormComponent) => ({
      SummaryComponent, InlineEditFormComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  ),
  connect(mapStateToProps)
)(Content);
