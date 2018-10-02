import React, { Component, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';
import classNames from 'classnames';
import i18n from 'i18n';

class ElementList extends Component {
  /**
   * Given an elementType, return a list of tabs that should be available in the edit form for an
   * element.
   *
   * @param {elementTypeType} element
   * @returns {string[]}
   */
  getEditTabs(element) {
    const { elementTypes } = this.props;
    const matchingType = elementTypes.find(type => element.BlockSchema.type === type.title);

    if (!matchingType || !matchingType.tabs) {
      return [];
    }

    return matchingType.tabs;
  }

  /**
   * Renders a list of Element components, each with an elementType object
   * of data mapped into it. The data is provided by a GraphQL HOC registered
   * in registerTransforms.js.
   */
  renderBlocks() {
    const {
      ElementComponent,
      HoverBarComponent,
      blocks,
      pageId,
      elementTypes,
      baseAddHref
    } = this.props;

    // Blocks can be either null or an empty array
    if (!blocks) {
      return null;
    }

    if (blocks && !blocks.length) {
      return <div>{i18n._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content')}</div>;
    }

    return blocks.map((element) => (
      <div key={element.ID}>
        <ElementComponent
          key={element.ID}
          element={element}
          pageId={pageId}
          editTabs={this.getEditTabs(element)}
          link={element.BlockSchema.actions.edit}
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
    const { blocks } = this.props;
    const listClassNames = classNames(
      'elemental-editor__list',
      { 'elemental-editor__list--empty': !blocks || !blocks.length }
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
  blocks: PropTypes.arrayOf(elementType),
  loading: PropTypes.bool,
  baseAddHref: PropTypes.string.isRequired,
};

ElementList.defaultProps = {
  blocks: [],
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
