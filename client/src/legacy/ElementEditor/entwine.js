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
        pageId: schemaData['page-id'],
        elementTypes: schemaData['element-types'],
      };

      ReactDOM.render(
        <ElementEditorComponent {...props} />,
        this[0]
      );
    },

    onunmatch() {
      ReactDOM.unmountComponentAtNode(this[0]);
    }
  });
});
