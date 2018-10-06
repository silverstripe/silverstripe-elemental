import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';
import { elementType } from 'types/elementType';

class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      elementFormLoaded: props.previewExpanded,
    };
  }

  componentWillReceiveProps(newProps) {
    const { elementFormLoaded } = this.state;
    const { previewExpanded } = newProps;

    const showForm = elementFormLoaded || previewExpanded;

    this.setState({
      elementFormLoaded: showForm,
    });
  }

  render() {
    const {
      element,
      previewExpanded,
      InlineEditFormComponent,
      SummaryComponent
    } = this.props;

    return (
      <div className="element-editor-content">
        {!previewExpanded &&
          // Show summary
          <SummaryComponent
            element={element}
          />
        }
        {(this.state.elementFormLoaded || previewExpanded) &&
          // Show inline editable fields
          <InlineEditFormComponent
            extraClass={{ 'element-editor-editform--collapsed': !previewExpanded }}
            onClick={(event) => event.stopPropagation()}
            elementId={element.ID}
          />
        }
      </div>
    );
  }
}

Content.propTypes = {
  element: elementType,
  previewExpanded: PropTypes.bool,
  SummaryComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  InlineEditFormComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Content.defaultProps = {};

export { Content as Component };

export default inject(
  ['ElementSummary', 'ElementInlineEditForm'],
  (SummaryComponent, InlineEditFormComponent) => ({
    SummaryComponent, InlineEditFormComponent,
  }),
  () => 'ElementEditor.ElementList.Element'
)(Content);
