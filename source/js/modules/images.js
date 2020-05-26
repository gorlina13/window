import {checkKey} from './util';

const images = () => {
  const workSection = document.querySelector(`.works`);
  const previews = workSection.querySelectorAll(`.preview`);
  const firstTabStop = previews[0].parentElement;
  const lastTabStop = previews[previews.length - 1].parentElement;
  const imgPopup = document.createElement(`div`);
  const imgWrapper = document.createElement(`div`);
  const bigImg = document.createElement(`img`);

  function setup() {
    previews.forEach((img) => {
      img.parentElement.setAttribute(`role`, `button`);
    });

    imgPopup.classList.add(`popup`);
    stylePopupElems();
    hidePopup();

    imgWrapper.appendChild(bigImg);
    imgPopup.appendChild(imgWrapper);
    workSection.appendChild(imgPopup);

    workSection.addEventListener(`click`, onworkSectionClick);
    workSection.addEventListener(`keydown`, onWorkSectionKeydown);
    window.addEventListener(`keydown`, onWindowKeydown);
  }


  function stylePopupElems() {
    imgPopup.style.justifyContent = `center`;
    imgPopup.style.alignItems = `center`;
    imgWrapper.style.flex = `0 1 85%`;
    imgWrapper.style.minWidth = `0%`;
    bigImg.style.display = `block`;
    bigImg.style.maxWidth = `100%`;
    bigImg.style.marginLeft = `auto`;
    bigImg.style.marginRight = `auto`;
  }

  function onworkSectionClick(evt) {
    const preview = evt.target.classList.contains(`preview`) ||
    evt.target.children[0].classList.contains(`preview`);

    const popup = evt.target.classList.contains(`popup`);

    if (preview) {
      evt.preventDefault();
      showPopup(evt);
    }

    if (popup) {
      hidePopup();
    }
  }

  function onWindowKeydown(evt) {
    if (checkKey(evt, `Escape`)) {
      if (imgPopup.style.display === `flex`) {
        evt.preventDefault();
        hidePopup();
      }
    }
  }

  function onWorkSectionKeydown(evt) {
    if (checkKey(evt, `Tab`)) {
      // If Shift + Tab
      if (evt.shiftKey) {
        if (document.activeElement === firstTabStop) {
          hidePopup();
        }
      // if Tab
      } else {
        if (document.activeElement === lastTabStop) {
          hidePopup();
        }
      }
    }

    if (checkKey(evt, ` `)) {
      if (evt.target.children[0].classList.contains(`preview`)) {
        evt.preventDefault();
        showPopup(evt);
      }
    }
  }

  function showPopup(evt) {
    imgPopup.style.display = `flex`;

    const path = evt.target.parentElement.getAttribute(`href`) ||
    evt.target.getAttribute(`href`);

    bigImg.setAttribute(`src`, path);
  }

  function hidePopup() {
    imgPopup.style.display = `none`;
  }

  setup();
};

export default images;
