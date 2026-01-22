/* eslint-disable */
import React from 'react'
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormBuilderModal from 'components/FormBuilderModal/FormBuilderModal';
import { getConfig } from 'state/editor/elementConfig';
import * as toastsActions from 'state/toasts/ToastsActions';
import { elementType } from 'types/elementType';
import { joinUrlPaths } from 'lib/urls';
import i18n from 'i18n';

const MoveModal = ({
  actions,
  element,
  isOpen,
  onSuccess,
  onClosed,
  type,
}) => {
  /**
   * Call back used by MoveModal after the form has been submitted and the response has been received
   */
  const onSubmit = async (modalData, action, submitFn) => {
    let formSchema = null;

    try {
      formSchema = await submitFn();
    } catch (error) {
      console.error(error);
      actions.toasts.error(i18n._t('ElementMoveAction.FAILED', 'Failed to move element'));
      // Intentionally using Promise.resolve() instead of Promise.reject() as existing code in FormBuilder.js
      // will raise console warnings if we use Promise.reject(). From a UX point of view it makes no difference.
      return Promise.resolve();
    }

    // slightly annoyingly, on validation error formSchema at this point will not have an errors node
    // instead it will have the original formSchema id used for the GET request to get the formSchema i.e.
    // admin/linkfield/schema/elemental-area/<ItemID>
    // instead of the one used by the POST submission i.e.
    // admin/linkfield/moveElementForm/<LinkID>
    const hasValidationErrors = formSchema.id.match(/\/schema\/elemental-area\/([0-9]+)/);
    if (hasValidationErrors) {
      // Throw a toast here - but let our formbuilder stuff handle populating the form with the error messages.
      actions.toasts.error(i18n._t('Admin.VALIDATIONERROR', 'Validation Error'));
    } else {
      // Pass the elementalAreaId and/or NewEditLink which are added through ElementalAreaController::moveElement().
      // ElementalAreaID is used to know which elemental area needs to be updated if moving the block between
      // elemental areas on the same parent.
      // NewEditLink is used to add a link to the new edit form for the block when moving to a new parent.
      onSuccess({
        elementalAreaId: formSchema.state.fields.find((field) => field.name === 'ElementalAreaID')?.value,
        newEditLink: formSchema.state.fields.find((field) => field.name === 'NewEditLink')?.value,
      });
    }
    return Promise.resolve();
  };

  const elementTitle = element.title ?? i18n.inject(
    i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
    { type: type.title }
  );
  const title = i18n.inject(
    i18n._t('ElementMoveAction.MODAL_TITLE', 'Move block {title}'),
    { title: elementTitle }
  );

  const schemaUrl = joinUrlPaths(getConfig().form.moveElementForm.schemaUrl, element.id.toString());
  return <FormBuilderModal
    title={title}
    isOpen={isOpen}
    schemaUrl={schemaUrl}
    identifier='Elemental.MovingElement'
    onSubmit={onSubmit}
    onClosed={onClosed}
    autoFocus={true}
  />;
}

MoveModal.propTypes = {
  element: elementType,
  isOpen: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClosed: PropTypes.func.isRequired,
};

// redux actions loaded into props - used to get toast notifications
const mapDispatchToProps = (dispatch) => ({
  actions: {
    toasts: bindActionCreators(toastsActions, dispatch),
  },
});

export { MoveModal as Component };

export default compose(
  connect(null, mapDispatchToProps)
)(MoveModal);
