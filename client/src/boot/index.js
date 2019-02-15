/* global window */

import registerComponents from 'boot/registerComponents';
import registerReducers from 'boot/registerReducers';
import registerTransforms from 'boot/registerTransforms';

window.document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  registerReducers();
  registerTransforms();
});
