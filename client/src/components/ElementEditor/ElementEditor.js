import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';

/**
 * The ElementEditor is used in the CMS to manage a list or nested lists of
 * elements for a page or other DataObject.
 */
class ElementEditor extends PureComponent {
  render() {
    const { ToolbarComponent, ListComponent, pageId, elementTypes } = this.props;

    return (
      <div className="element-editor">
        <ToolbarComponent elementTypes={elementTypes} />
        <ListComponent pageId={pageId} />
      </div>
    );
  }
}

ElementEditor.propTypes = {
  elementTypes: PropTypes.array.isRequired,
  pageId: PropTypes.number.isRequired,
};

ElementEditor.defaultProps = {};

export { ElementEditor as Component };
export default inject(
  ['ElementToolbar', 'ElementList'],
  (ToolbarComponent, ListComponent) => ({
    ToolbarComponent,
    ListComponent,
  }),
  () => 'ElementEditor'
)(ElementEditor);
