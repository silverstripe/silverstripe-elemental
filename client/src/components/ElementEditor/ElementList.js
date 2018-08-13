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

  /**
   * Renders a loading component
   *
   * @returns {LoadingComponent|null}
   */
  renderLoading() {
    const { loading, LoadingComponent } = this.props;

    if (loading) {
      return <LoadingComponent />;
    }
    return null;
  }

  render() {
    return (
      <div className="elemental-editor__list">
        {this.renderLoading()}
        {this.renderBlocks()}
      </div>
    );
  }
}

ElementList.propTypes = {
  // @todo support either ElementList or Element children in an array (or both)
  blocks: PropTypes.arrayOf(elementType),
  loading: PropTypes.bool,
};

ElementList.defaultProps = {
  blocks: [],
  loading: false,
};

export { ElementList as Component };

export default inject(
  ['Element', 'Loading'],
  (ElementComponent, LoadingComponent) => ({
    ElementComponent,
    LoadingComponent,
  }),
  () => 'ElementEditor.ElementList'
)(ElementList);
