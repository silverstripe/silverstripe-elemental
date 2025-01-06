/* global window */
import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'lib/Injector';
import { bindActionCreators, compose } from 'redux';
import { elementTypeType } from 'types/elementTypeType';
import backend from 'lib/Backend';
import Config from 'lib/Config';
import { getConfig } from 'state/editor/elementConfig';
import * as toastsActions from 'state/toasts/ToastsActions';
import getJsonErrorMessage from 'lib/getJsonErrorMessage';
import { arrayMove } from '@dnd-kit/sortable';

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
      dragging: false,
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.fetchElements = this.fetchElements.bind(this);
  }

  /**
   * Hook triggered when a draggable is picked up.
   */
  handleDragStart(event) {
    const { active } = event;
    this.setState({
      dragging: active.id,
    });
  }

  /**
   * Hook triggered when a draggable is dropped onto a drop target.
   */
  handleDragEnd(event) {
    const { active, over } = event;
    const { elements } = this.state;

    // This happens if letting go of the draggable where it started.
    if (active.id === over.id) {
      this.setState({
        dragging: false,
      });
      return;
    }

    const elementIDs = elements.map(e => e.id);
    const fromIndex = elementIDs.indexOf(active.id);
    const toIndex = elementIDs.indexOf(over.id);
    const sortedElements = arrayMove(elements, fromIndex, toIndex);
    const afterBlockID = toIndex > 0 ? sortedElements[toIndex - 1].id : 0;

    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/sort`;
    backend.post(url, {
      id: active.id,
      afterBlockID,
    }, {
      'X-SecurityID': Config.get('SecurityID')
    })
      .then(() => this.fetchElements())
      .catch(async (err) => {
        const message = await getJsonErrorMessage(err);
        this.props.actions.toasts.error(message);
      });

    this.setState({
      dragging: false,
      // Setting elements ensures there is no "pop" between dropping the element and reloading
      // the list with fetchElements above, as the elements will already be rendered in the new order.
      elements: sortedElements,
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
      allowedElements,
      sharedObject,
      isLoading,
    } = this.props;
    const { dragging, elements } = this.state;

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

    return <div className="element-editor">
      <ElementEditorContext.Provider value={providerValue}>
        <ToolbarComponent
          elementTypes={allowedElementTypes}
          areaId={areaId}
        />
        <ListComponent
          allowedElementTypes={allowedElementTypes}
          elementTypes={elementTypes}
          areaId={areaId}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          dragging={dragging}
          sharedObject={sharedObject}
          elements={elements}
          isLoading={isLoading}
        />
      </ElementEditorContext.Provider>
    </div>;
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
