/* global window */

import registerComponents from 'boot/registerComponents';
import registerTransforms from 'boot/registerTransforms';

window.document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  registerTransforms();
});
