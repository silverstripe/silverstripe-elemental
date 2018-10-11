import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';

/**
 * The ElementEditor is used in the CMS to manage a list or nested lists of
 * elements for a page or other DataObject.
 */
class ElementEditor extends PureComponent {
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

    return (
      <div className="element-editor">
        <ToolbarComponent
          elementTypes={elementTypes}
          elementalAreaId={elementalAreaId}
        />
        <ListComponent
          elementTypes={elementTypes}
          pageId={pageId}
          elementalAreaId={elementalAreaId}
        />
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
