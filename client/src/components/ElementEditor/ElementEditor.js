import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';

/**
 * The ElementEditor is used in the CMS to manage a list or nested lists of
 * elements for a page or other DataObject.
 */
class ElementEditor extends PureComponent {
  render() {
    const {
      ToolbarComponent,
      ListComponent,
      areaId,
      elementTypes,
      baseAddHref,
    } = this.props;

    // console.log(blocks);

    return (
      <div className="element-editor">
        <ToolbarComponent elementTypes={elementTypes} baseAddHref={baseAddHref} />
        <ListComponent elementTypes={elementTypes} areaId={areaId} baseAddHref={baseAddHref} />
      </div>
    );
  }
}

ElementEditor.propTypes = {
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  areaId: PropTypes.number.isRequired,
  baseAddHref: PropTypes.string.isRequired,
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
