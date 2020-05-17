import 'element-closest-polyfill';
import './slider';
import modal from './modules/modal';
import tabbed from './modules/tabbed';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';

function work() {
  const modalState = {};
  const deadline = `2020-06-01`;

  changeModalState(modalState);
  modal();
  tabbed({
    selectors: [`.glazing_slider`, `.glazing_block`, `.glazing_content`],
    activeClass: `active`,
    nameSpace: `glazing`
  });
  tabbed({
    selectors: [`.decoration_slider`, `.no_click`, `.decoration_panel`],
    activeClass: `after_click`,
    nameSpace: `decoration`
  });
  tabbed({
    selectors: [`.balcon_icons`, `.balcon_icons_img`, `.balcon_img`],
    activeClass: `do_image_more`,
    nameSpace: `balcon`,
    display: `inline-block`
  });
  timer(`.container1`, deadline);
}

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
