/* global window */

// eslint-disable-next-line import/no-unresolved
import jQuery from 'jquery';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadComponent } from 'lib/Injector';
import { getConfig } from 'state/editor/elementConfig';
import { destroy } from 'redux-form';

/**
 * Reset the Apollo and Redux stores holding data relating to elemental inline edit forms
 */
const resetStores = () => {
  // After page level saves we need to reload all the blocks from the server. We can remove
  // this if we can figure out a way to optimistically update the apollo cache. See:
  // https://github.com/dnadesign/silverstripe-elemental/pull/439#issuecomment-428773370
  window.ss.apolloClient.resetStore();

  // Defer playing with redux store
  setTimeout(() => {
    // After the page submit we want to destroy the form values so it's reloaded. We can't
    // just set the current form state to the original state because some form data is
    // mutated on the server side.
    const { store } = window.ss;

    if (!store) {
      return;
    }

    // We can introspect the store to find form names in the `element` namespace
    store.dispatch(destroy(
      ...Object.keys(store.getState().form.formState.element || {}).map(name => `element.${name}`)
    ));
  }, 0);
};

/**
 * Uses entwine to inject the HistoryViewer React component into the DOM, when used
 * outside of a React context e.g. in the CMS
 */
jQuery.entwine('ss', ($) => {
  $('.js-injector-boot .element-editor__container').entwine({
    ReactRoot: null,

    // This object is shared between entwine.js and the ElementList react component. It allows:
    // - entwine to call setState() on ElementList
    // - ElementList to call entwineResolve() on entwine
    AreaIDsSharedObject: {},

    // Increment is in Element.js to force subsequent form submissions on failed client-side validation
    // If elements fail client-side validation in Validator.js e.g. RequiredFields then
    // they'll end up in a state where they need to re-render in order to re-submit
    // because the form submission is blocked by the client-side validation, meaning that
    // no formSchema response is received which is normally used to trigger a state update
    Increment: 0,

    onmatch() {
      const context = {};
      const ElementEditorComponent = loadComponent('ElementEditor', context);
      const schemaData = this.data('schema');
      const elementTypes = getConfig().elementTypes;
      const areaID = schemaData['elemental-area-id'];
      const areaIDsSharedObject = this.getAreaIDsSharedObject();
      if (!areaIDsSharedObject.hasOwnProperty(areaID)) {
        areaIDsSharedObject[areaID] = {
          entwineResolve: null,
          setState: null,
        };
      }
      const props = {
        areaId: areaID,
        allowedElements: schemaData['allowed-elements'],
        elementTypes,
        sharedObject: areaIDsSharedObject[areaID],
      };
      let root = this.getReactRoot();
      if (!root) {
        root = createRoot(this[0]);
        this.setReactRoot(root);
      }
      root.render(<ElementEditorComponent {...props} />);
    },

    onunmatch() {
      // Reset the store if the user navigates to a different part of the CMS
      // or after submission if there are no validation errors
      if (!$('.cms-edit-form').data('hasValidationErrors')) {
        resetStores();
      }
      this.unmountComponent();
    },

    unmountComponent() {
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },

    'from .cms-edit-form': {
      onbeforesubmitform(event, data) {
        if (!data || this.is('.elemental-area--read-only')) {
          return;
        }
        // Create a promise and expose the resolve function
        // The promise is added to the data object when is used in LeftAndMain submitForm()
        // as a condition for submitting the form
        // The resolve function is called from the ElementList react component once all
        // dirty element forms have been validated and saved
        let entwineResolve;
        const entwinePromise = new Promise((resolve) => {
          entwineResolve = resolve;
        });
        data.promises.push(entwinePromise);
        data.onAjaxSuccessCallbacks.push(this.unmountComponent.bind(this));
        const areaID = this.data('schema')['elemental-area-id'];
        const areaIDsSharedObject = this.getAreaIDsSharedObject();
        const sharedObject = areaIDsSharedObject[areaID];
        const increment = this.getIncrement() + 1;
        this.setIncrement(increment);
        sharedObject.entwineResolve = entwineResolve;
        // setState() is bound in the constructor of the ElementList react component
        // setting saveAllElementst to true will trigger a re-render in the react component
        sharedObject.setState({
          saveAllElements: true,
          increment
        });
      },

      onaftersubmitform(event, data) {
        const validationResultPjax = JSON.parse(data.xhr.responseText).ValidationResult;
        const validationResult = JSON.parse(validationResultPjax.replace(/<\/?script[^>]*?>/g, ''));

        // Reset redux store if form is succesfully submitted so apollo to refetches element data
        // Do not reset if there are any validation errors because we want redux to hydrate the
        // form, rather than then refetching which will return a value from the database.
        // Instead the user should still see any modfied value they just entered.
        if (validationResult.isValid) {
          $('.cms-edit-form').data('hasValidationErrors', false);
          resetStores();
        } else {
          $('.cms-edit-form').data('hasValidationErrors', true);
        }
      }
    },
  });

  $('.js-injector-boot .element-editor__container .element-form-dirty-state').entwine({
    onmatch() {
      $('.cms-edit-form').trigger('change');
    },
    onunmatch() {
      $('.cms-edit-form').trigger('change');
    }
  });

  // Prevent dirty form detection on any field loaded in with FormBuilderLoader.
  // This looks pretty hacky, and it is. This is mostly copied from some code in subsites that does
  // a similar thing (with some history):
  $('.cms-edit-form').entwine({
    getChangeTrackerOptions() {
      // Figure out if we're still returning the default value
      const isDefault = (this.entwineData('ChangeTrackerOptions') === undefined);
      // Get the current options
      let opts = this._super();

      if (isDefault) {
        // If it is the default then...
        // clone the object (so we don't modify the original),
        opts = $.extend({}, opts);
        // modify it,
        opts.ignoreFieldSelector += ', .elementalarea :input:not(.element-form-dirty-state)';
        // then set the clone as the value on this element
        // (so next call to this method gets this same clone)
        this.setChangeTrackerOptions(opts);
      }

      return opts;
    }
  });
});
