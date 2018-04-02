import jQuery from 'jquery';

jQuery.entwine('ss', ($) => {
  $('.cms-tabset-nav-primary .ui-tabs-anchor').entwine({
    /**
     * Hide or show the primary CMS actions when going in and out of the history tab
     */
    toggleActionsBar() {
      const cmsActions = $('.cms-content-actions');

      if (this.parent('li').attr('aria-controls') === 'Root_History'
        && (
          $('.elemental-block__history').length > 0
          || $('.history-viewer__container').length > 0
        )
      ) {
        cmsActions.hide();
      } else {
        cmsActions.show();
      }
    },

    onmatch() {
      this._super();

      if (this.parent('li').hasClass('ui-state-active')) {
        this.toggleActionsBar();
      }
    },

    onclick() {
      this._super();

      this.toggleActionsBar();
    }
  });
});
