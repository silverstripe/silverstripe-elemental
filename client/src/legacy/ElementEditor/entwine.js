/* global window */

import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { loadComponent } from 'lib/Injector';
import { getConfig } from 'state/editor/elementConfig';

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
        pageId: schemaData['page-id'],
        elementalAreaId: schemaData['elemental-area-id'],
        elementTypes,
      };

      ReactDOM.render(
        <ElementEditorComponent {...props} />,
        this[0]
      );
    },

    onunmatch() {
      ReactDOM.unmountComponentAtNode(this[0]);
    },

    /**
     * Invalidate cache after the form is submitted to force apollo to re-fetch.
     */
    'from .cms-edit-form': {
      onaftersubmitform() {
        window.ss.apolloClient.resetStore();
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
        if (opts.fieldSelector === undefined) {
          opts.fieldSelector = ':input:not(:button,[type="submit"],[type="search"],.gridstate)';
        }
        opts.fieldSelector += ', .element-editor-header';
        // then set the clone as the value on this element
        // (so next call to this method gets this same clone)
        this.setChangeTrackerOptions(opts);
      }

      return opts;
    }
  });
});
