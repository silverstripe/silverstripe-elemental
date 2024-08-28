/* global window */
import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'lib/Injector';
import { bindActionCreators, compose } from 'redux';
import { elementTypeType } from 'types/elementTypeType';
import { DropTarget } from 'react-dnd';
import ElementDragPreview from 'components/ElementEditor/ElementDragPreview';
import withDragDropContext from 'lib/withDragDropContext';
import backend from 'lib/Backend';
import Config from 'lib/Config';
import { getConfig } from 'state/editor/elementConfig';
import * as toastsActions from 'state/toasts/ToastsActions';
import getJsonErrorMessage from 'lib/getJsonErrorMessage';

export const ElementEditorContext = createContext(null);

/**
 * The ElementEditor is used in the CMS to manage a list or nested lists of
 * elements for a page or other DataObject.
 */
class ElementEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragTargetElementId: null,
      dragSpot: null,
      elements: null,
      isLoading: true,
    };

    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.fetchElements = this.fetchElements.bind(this);
  }

  /**
   * Hook for ReactDND triggered by hovering over a drag _target_.
   *
   * This tracks the current hover target and whether it's above the top half of the target
   * or the bottom half.
   *
   * @param element
   * @param isOverTop
   */
  handleDragOver(element = null, isOverTop = null) {
    const id = element ? element.id : false;

    this.setState({
      dragTargetElementId: id,
      dragSpot: isOverTop === false ? 'bottom' : 'top',
    });
  }

  /**
   * Hook for ReactDND triggered when a drag source is dropped onto a drag target.
   *
   * @param sourceId
   * @param afterId
   */
  handleDragEnd(sourceId, afterId) {
    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/sort`;
    backend.post(url, {
      id: sourceId,
      afterBlockID: afterId,
    }, {
      'X-SecurityID': Config.get('SecurityID')
    })
      .then(() => this.fetchElements())
      .catch(async (err) => {
        const message = await getJsonErrorMessage(err);
        this.props.actions.toasts.error(message);
      });

    this.setState({
      dragTargetElementId: null,
      dragSpot: null,
    });
  }

  /**
   * Make an API call to read all elements endpoint (areaID)
   */
  fetchElements(doSetLoadingState = true) {
    if (doSetLoadingState) {
      this.setState(prevState => ({
        ...prevState,
        isLoading: true,
      }));
    }
    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/readElements/${this.props.areaId}`;
    return backend.get(url)
      .then(async (response) => {
        const responseJson = await response.json();
        this.setState(prevState => ({
          ...prevState,
          elements: responseJson,
          isLoading: false,
        }));
        // refresh preview
        const preview = window.jQuery('.cms-preview');
        if (preview) {
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        }
      })
      .catch(async (err) => {
        this.setState({
          elements: [],
          isLoading: false,
        });
        const message = await getJsonErrorMessage(err);
        this.props.actions.toasts.error(message);
      });
  }

  render() {
    const {
      ToolbarComponent,
      ListComponent,
      areaId,
      elementTypes,
      isDraggingOver,
      connectDropTarget,
      allowedElements,
      sharedObject,
      isLoading,
    } = this.props;
    const { dragTargetElementId, dragSpot, elements } = this.state;

    if (elements === null) {
      this.fetchElements(false);
      return null;
    }

    // Map the allowed elements because we want to retain the sort order provided by that array.
    const allowedElementTypes = allowedElements.map(className =>
      elementTypes.find(type => type.class === className)
    );

    // Need to convert this to a functional component in order to resolve the following eslint warning:
    // warning  The 'providerValue' object (at line 124) passed as the value prop to the Context provider (at line 127) changes every render. To fix this consider wrapping it in a useMemo hook
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const providerValue = {
      fetchElements: this.fetchElements,
    };

    return connectDropTarget(
      <div className="element-editor">
        <ElementEditorContext.Provider value={providerValue}>
          <ToolbarComponent
            elementTypes={allowedElementTypes}
            areaId={areaId}
            onDragOver={this.handleDragOver}
          />
          <ListComponent
            allowedElementTypes={allowedElementTypes}
            elementTypes={elementTypes}
            areaId={areaId}
            onDragOver={this.handleDragOver}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            dragSpot={dragSpot}
            isDraggingOver={isDraggingOver}
            dragTargetElementId={dragTargetElementId}
            sharedObject={sharedObject}
            elements={elements}
            isLoading={isLoading}
          />
          <ElementDragPreview elementTypes={elementTypes} />
        </ElementEditorContext.Provider>
      </div>
    );
  }
}

ElementEditor.propTypes = {
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  allowedElements: PropTypes.arrayOf(PropTypes.string).isRequired,
  areaId: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    handleSortBlock: PropTypes.func,
  }),
};

export { ElementEditor as Component };

const params = [
  withDragDropContext,
  DropTarget('element', {}, (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isDraggingOver: monitor.isOver(), // isDragging is not available on DropTargetMonitor
  })),
  inject(
    ['ElementToolbar', 'ElementList'],
    (ToolbarComponent, ListComponent) => ({
      ToolbarComponent,
      ListComponent,
    }),
    () => 'ElementEditor'
  )
];

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toasts: bindActionCreators(toastsActions, dispatch),
    },
  };
}

export default compose(
  connect(null, mapDispatchToProps),
  ...params,
)(ElementEditor);
