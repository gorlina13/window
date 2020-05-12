import 'element-closest-polyfill';
import './slider';
import modal from './modules/modal';
import tabbed from './modules/tabbed';

function work() {
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
}

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
