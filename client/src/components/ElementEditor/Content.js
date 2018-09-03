import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';

class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      elementFormLoaded: props.previewExpanded,
    };
  }

  componentWillReceiveProps(newProps) {
    const showForm = this.state.elementFormLoaded || newProps.previewExpanded;

    this.setState(
      (prevState) => ({
        ...prevState,
        elementFormLoaded: showForm,
      })
    );

    return showForm;
  }

  render() {
    const {
      id,
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
        {(this.state.elementFormLoaded || previewExpanded) &&
          // Show inline editable fields
          <FormBuilderComponent
            extraClasses={{ 'element-editor-formbuilder--collapsed': !previewExpanded }}
            onClick={(event) => event.stopPropagation()}
            elementId={id}
          />
        }
      </div>
    );
  }
}

Content.defaultProps = {};

Content.propTypes = {
  id: PropTypes.number,
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
