import React, { Component, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';
import classNames from 'classnames';
import i18n from 'i18n';

class ElementList extends Component {
  /**
   * Renders a list of Element components, each with an elementType object
   * of data mapped into it. The data is provided by a GraphQL HOC registered
   * in registerTransforms.js.
   */
  renderBlocks() {
    const {
      ElementComponent,
      HoverBarComponent,
      elements,
      areaId,
      elementTypes,
      baseAddHref
    } = this.props;

    // Blocks can be either null or an empty array
    if (!elements) {
      return null;
    }

    if (elements && !elements.length) {
      return <div>{i18n._t('ElementList.ADD_BLOCKS', 'Add elements to place your content')}</div>;
    }

    return elements.map((element) => (
      <div>
        <ElementComponent
          key={element.ID}
          element={element}
          areaId={areaId}
        />
        <HoverBarComponent
          baseAddHref={baseAddHref}
          elementId={element.ID}
          elementTypes={elementTypes}
          key={`AddBlockHoverBar_${element.ID}`}
        />
      </div>
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
    const { elements } = this.props;
    const listClassNames = classNames(
      'elemental-editor__list',
      { 'elemental-editor__list--empty': !elements || !elements.length }
    );

    return (
      <div className={listClassNames}>
        {this.renderLoading()}
        {this.renderBlocks()}
      </div>
    );
  }
}

ElementList.propTypes = {
  // @todo support either ElementList or Element children in an array (or both)
  elements: PropTypes.arrayOf(elementType),
  loading: PropTypes.bool,
  baseAddHref: PropTypes.string.isRequired,
  areaId: PropTypes.string.isRequired,
};

ElementList.defaultProps = {
  elements: [],
  loading: false,
};

export { ElementList as Component };

export default inject(
  ['Element', 'Loading', 'HoverBar'],
  (ElementComponent, LoadingComponent, HoverBarComponent) => ({
    ElementComponent,
    LoadingComponent,
    HoverBarComponent,
  }),
  () => 'ElementEditor.ElementList'
)(ElementList);
