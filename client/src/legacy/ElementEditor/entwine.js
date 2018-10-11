/* global window */

import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { loadComponent } from 'lib/Injector';

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

      const props = {
        fieldName: this.attr('name'),
        pageId: schemaData['page-id'],
        elementTypes: schemaData['element-types'],
        baseAddHref: schemaData['base-add-href']
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
});
