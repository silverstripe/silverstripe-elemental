/* global window */
import jQuery from 'jquery';
import { toggleElementOpen } from 'state/element/ElementActions';

jQuery.entwine('ss.preview', ($) => {
  $('.cms-preview').entwine({
    onadd() {
      const iframe = this.find('iframe');

      iframe.bind('load', () => {
        this._bindElementalBlocks(iframe);
      });

      this._super();
    },

    _bindElementalBlocks(iframe) {
      const previewPane = iframe.contents();

      const editButton = $('<button class="elemental-edit-button">Edit</button>');
      editButton.click(({ target }) => this._editElementalBlock($(target).parent().data('element-id')));

      // Append edit buttons to elements on hover
      previewPane.find('[data-element-id]').append(editButton);
    },

    _editElementalBlock(id) {
      window.ss.store.dispatch(toggleElementOpen(id, true));
    },
  });
});
