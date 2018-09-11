import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';

import ElementDragPreview from 'components/ElementEditor/ElementDragPreview';

/**
 * The ElementEditor is used in the CMS to manage a list or nested lists of
 * elements for a page or other DataObject.
 */
class ElementEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragTargetElementId: false,
      isDragging: false,
      draggedElement: null,
    };

    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragDrop = this.handleDragDrop.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  }

  handleDragStart(element) {
    this.setState({
      draggedElement: element,
    });
  }

  handleDragOver(element) {
    const id = element ? element.ID : false;

    if (this.state.dragTargetElementId !== id) {
      this.setState({
        dragTargetElementId: id,
        isDragging: true,
      });
    }
  }

  handleDragDrop() {
    this.setState({
      dragTargetElementId: false,
      isDragging: false,
    });
  }

  render() {
    const {
      fieldName,
      formState,
      ToolbarComponent,
      ListComponent,
      pageId,
      elementalAreaId,
      elementTypes,
    } = this.props;
    const { dragTargetElementId, isDragging } = this.state;

    const classNames = classnames('element-editor', {
      'element-editor--dragging': isDragging,
    });

    return (
      <div className={classNames}>
        <ToolbarComponent
          elementTypes={elementTypes}
          elementalAreaId={elementalAreaId}
          onDragOver={this.handleDragOver}
          onDragDrop={this.handleDragDrop}
        />
        <ListComponent
          elementTypes={elementTypes}
          pageId={pageId}
          elementalAreaId={elementalAreaId}
          onDragOver={this.handleDragOver}
          onDragDrop={this.handleDragDrop}
          onDragStart={this.handleDragStart}
          dragTargetElementId={dragTargetElementId}
          isDragging={isDragging}
        />
        <ElementDragPreview />
        <input name={fieldName} type="hidden" value={JSON.stringify(formState)} />
      </div>
    );
  }
}

ElementEditor.propTypes = {
  fieldName: PropTypes.string,
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  pageId: PropTypes.number.isRequired,
  elementalAreaId: PropTypes.number.isRequired,
};

ElementEditor.defaultProps = {};

function mapStateToProps(state) {
  const formNamePattern = loadElementFormStateName('[0-9]+');
  const elementFormState = state.form.formState.element;

  if (!elementFormState) {
    return {};
  }

  const formState = Object.keys(elementFormState)
    .filter(key => key.match(formNamePattern))
    .reduce((accumulator, key) => ({
        ...accumulator,
        [key]: elementFormState[key].values
    }), {});

  return { formState };
}

export { ElementEditor as Component };
export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps),
  inject(
    ['ElementToolbar', 'ElementList'],
    (ToolbarComponent, ListComponent) => ({
      ToolbarComponent,
      ListComponent,
    }),
    () => 'ElementEditor'
  )
)(ElementEditor);
