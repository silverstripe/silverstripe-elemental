import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';

class Content extends PureComponent {
  render() {
    const {
      fileUrl,
      fileTitle,
      content,
      previewExpanded,
      FormBuilderComponent,
      SummaryComponent
    } = this.props;

    if (!content && !fileUrl) {
      return null;
    }

    return (
      <div className="element-editor-content">
        {!previewExpanded &&
          // Show summary
          <SummaryComponent
            content={content}
            fileUrl={fileUrl}
            fileTitle={fileTitle}
          />
        }
        {previewExpanded &&
          // Show inline editable fields
          <FormBuilderComponent />
        }
      </div>
    );
  }
}

Content.defaultProps = {};

Content.propTypes = {
  content: PropTypes.string,
  fileUrl: PropTypes.string,
  fileTitle: PropTypes.string,
  previewExpanded: PropTypes.bool,
};

export { Content as Component };

export default inject(
  ['ElementSummary', 'ElementFormBuilder'],
  (SummaryComponent, FormBuilderComponent) => ({
    SummaryComponent, FormBuilderComponent,
  }),
  () => 'ElementEditor.ElementList.Element'
)(Content);
