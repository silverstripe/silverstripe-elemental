/* global window */

import registerComponents from 'boot/registerComponents';
import registerTransforms from 'boot/registerTransforms';
import registerReducers from 'boot/registerReducers';

window.document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  registerTransforms();
  registerReducers();
});
