(function($) {
    $('.cms-tabset-nav-primary .ui-tabs-anchor').entwine({
        /**
         * Hide or show the primary CMS actions when going in and out of the history tab
         */
        toggleActionsBar: function() {
            if ($(this).parent('li').attr('aria-controls') === 'Root_History'
                && $('.elemental-block__history').length > 0
            ) {
                $('.cms-content-actions').hide();
            } else {
                $('.cms-content-actions').show();
            }
        },

        onmatch: function() {
            this._super();

            if ($(this).parent('li').hasClass('ui-state-active')) {
                this.toggleActionsBar();
            }
        },

        onclick: function() {
            this._super();

            this.toggleActionsBar();
        }
    });
})(jQuery);
