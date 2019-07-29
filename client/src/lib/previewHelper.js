/* global window */

export default class Preview {
  constructor() {
    this.preview = window.jQuery('.cms-preview');
  }

  /**
   * Reload the preview frame so that it updates with the latest content
   */
  reload() {
    this.preview.entwine('ss.preview')._loadUrl(this.preview.find('iframe').attr('src'));
  }
}
