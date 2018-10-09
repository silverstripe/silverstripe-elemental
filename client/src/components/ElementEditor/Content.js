import React, { PureComponent, PropTypes } from 'react';
import { inject, withInjector } from 'lib/Injector';
import { elementType } from 'types/elementType';
import { getElementTypeConfig } from 'state/editor/getElementConfig';

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
    } = this.props;

    const SummaryComponent = this.context.injector.get(
      getElementTypeConfig(element.__typename).properties.summaryComponent
    );

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
  InlineEditFormComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Content.defaultProps = {};

export { Content as Component };

export default inject(
  ['ElementInlineEditForm'],
  (InlineEditFormComponent) => ({
    InlineEditFormComponent,
  }),
  () => 'ElementEditor.ElementList.Element'
)(withInjector(Content));
