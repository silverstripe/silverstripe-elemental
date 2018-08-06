import React, { Component, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';

class ElementList extends Component {
  /**
   * Renders a list of Element components, each with an elementType object
   * of data mapped into it. The data is provided by a GraphQL HOC registered
   * in registerTransforms.js.
   */
  renderBlocks() {
    const { ElementComponent, blocks } = this.props;

    if (!blocks) {
      return null;
    }

    return blocks.map((element) => (
      <ElementComponent
        key={element.ID}
        element={element}
        link={element.BlockSchema.actions.edit}
      />
    ));
  }

  render() {
    return (
      <div className="elemental-editor__list">
        {this.renderBlocks()}
      </div>
    );
  }
}

ElementList.propTypes = {
  // @todo support either ElementList or Element children in an array (or both)
  blocks: PropTypes.arrayOf(elementType),
};

ElementList.defaultProps = {
  blocks: [],
};

export { ElementList as Component };

export default inject(
  ['Element'],
  (ElementComponent) => ({
    ElementComponent,
  }),
  () => 'ElementEditor.ElementList'
)(ElementList);
