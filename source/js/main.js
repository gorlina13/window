import 'element-closest-polyfill';
import './slider.js';
import modal from './modules/modal';

function work() {
  modal();
}

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
