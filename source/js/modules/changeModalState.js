import {checkSpaceBar, checkEnter} from './util';
import checkNumInput from './checkNumInput';

const changeModalState = (state) => {
  const balconList = document.querySelector(`.balcon_icons`);
  const balconSelector = `.balcon_icons_img`;
  const balcons = document.querySelectorAll(balconSelector);
  const width = document.querySelector(`#width`);
  const height = document.querySelector(`#height`);
  const viewType = document.querySelector(`#view_type`);
  const profiles = document.querySelectorAll(`.checkbox`);
  const onBalconListClick = chooseBalcon;

  function onBalconListKeydown(prop, evt) {
    if (checkSpaceBar(evt) || checkEnter(evt)) {
      chooseBalcon(evt, prop);
    }
  }

  function chooseBalcon(prop, evt) {
    const target = evt.target.closest(balconSelector);

    if (target) {
      const index = Array.prototype.indexOf.call(balcons, target);
      state[prop] = index;
    }
  }

  function onProfileChange(prop, i) {
    state[prop] = i === 0 ? `Холодное` : `Теплое`;
    profiles.forEach((box, j) => {
      box.checked = false;
      if (i === j) {
        box.checked = true;
      }
    });
  }

  function onPropValueChange(prop, evt) {
    state[prop] = evt.target.value;
  }

  function bindActionToElems(evtType, elem, action, prop) {
    switch (elem) {
      case profiles:
        elem.forEach((item, i) => {
          item.addEventListener(evtType, action.bind(null, prop, i));
        });
        break;

      case balconList:
      case width:
      case height:
      case viewType:
        elem.addEventListener(evtType, action.bind(null, prop));
        break;
    }
  }

  checkNumInput(width);
  checkNumInput(height);
  bindActionToElems(`click`, balconList, onBalconListClick, `balconType`);
  bindActionToElems(`keydown`, balconList, onBalconListKeydown, `balconType`);
  bindActionToElems(`input`, width, onPropValueChange, `width`);
  bindActionToElems(`input`, height, onPropValueChange, `height`);
  bindActionToElems(`change`, viewType, onPropValueChange, `viewType`);
  bindActionToElems(`change`, profiles, onProfileChange, `profile`);
};

export default changeModalState;
