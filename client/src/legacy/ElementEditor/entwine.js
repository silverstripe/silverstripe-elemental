/* global window */

import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
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
    onmatch() {
      const context = {};
      const ElementEditorComponent = loadComponent('ElementEditor', context);
      const schemaData = this.data('schema');
      const elementTypes = getConfig().elementTypes;

      const props = {
        fieldName: this.attr('name'),
        areaId: schemaData['elemental-area-id'],
        allowedElements: schemaData['allowed-elements'],
        elementTypes,
      };

      ReactDOM.render(
        <ElementEditorComponent {...props} />,
        this[0]
      );
    },

    onunmatch() {
      resetStores();
      ReactDOM.unmountComponentAtNode(this[0]);
    },

    /**
     * Invalidate cache after the form is submitted to force apollo to re-fetch.
     */
    'from .cms-edit-form': {
      onaftersubmitform() {
        resetStores();
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
