import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * The ElementEditor is used in the CMS to manage a list or nested lists of
 * elements for a page or other DataObject.
 */
class ElementEditor extends PureComponent {
  render() {
    const {
      ToolbarComponent, ListComponent,
      fieldName, pageId, elementTypes, baseAddHref, formState,
    } = this.props;

    return (
      <div className="element-editor">
        <ToolbarComponent elementTypes={elementTypes} baseAddHref={baseAddHref} />
        <ListComponent elementTypes={elementTypes} pageId={pageId} baseAddHref={baseAddHref} />
        <input name={fieldName} type="hidden" value={JSON.stringify(formState)} />
      </div>
    );
  }
}

ElementEditor.propTypes = {
  fieldName: PropTypes.string,
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  pageId: PropTypes.number.isRequired,
  baseAddHref: PropTypes.string.isRequired,
};

ElementEditor.defaultProps = {};

function mapStateToProps(state) {
  // TODO Use `loadElementFormStateName` when Raissa's PR is merged
  const formNamePattern = ('ElementForm_%s').replace('%s', '[0-9]+');
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
