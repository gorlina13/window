import {checkTab, checkEsc, checkSpaceBar} from './util';

const images = () => {
  const workSection = document.querySelector(`.works`);
  const previews = workSection.querySelectorAll(`.preview`);
  const firstTabStop = previews[0].parentElement;
  const lastTabStop = previews[previews.length - 1].parentElement;
  const imgPopup = document.createElement(`div`);
  const imgWrapper = document.createElement(`div`);
  const bigImage = document.createElement(`img`);

  previews.forEach((img) => {
    img.parentElement.setAttribute(`role`, `button`);
  });

  imgPopup.classList.add(`popup`);
  imgPopup.style.justifyContent = `center`;
  imgPopup.style.alignItems = `center`;
  imgWrapper.style.flex = `0 1 85%`;
  imgWrapper.style.minWidth = `0%`;
  bigImage.style.display = `block`;
  bigImage.style.maxWidth = `100%`;
  bigImage.style.marginLeft = `auto`;
  bigImage.style.marginRight = `auto`;
  hideImage();

  imgWrapper.appendChild(bigImage);
  imgPopup.appendChild(imgWrapper);
  workSection.appendChild(imgPopup);

  workSection.addEventListener(`click`, onworkSectionClick);
  workSection.addEventListener(`keydown`, onWorkSectionKeydown);
  window.addEventListener(`keydown`, onWindowKeydown);

  function onworkSectionClick(evt) {
    const preview = evt.target.classList.contains(`preview`) ||
    evt.target.children[0].classList.contains(`preview`);

    const popup = evt.target.classList.contains(`popup`);

    if (preview) {
      evt.preventDefault();
      showImage(evt);
    }

    if (popup) {
      hideImage();
    }
  }

  function onWindowKeydown(evt) {
    // if Esc
    if (checkEsc(evt)) {
      if (imgPopup.style.display === `flex`) {
        evt.preventDefault();
        hideImage();
      }
    }
  }

  function onWorkSectionKeydown(evt) {
    if (checkTab(evt)) {
      // If Shift + Tab
      if (evt.shiftKey) {
        if (document.activeElement === firstTabStop) {
          hideImage();
        }
      // if Tab
      } else {
        if (document.activeElement === lastTabStop) {
          hideImage();
        }
      }
    }

    if (checkSpaceBar(evt)) {
      if (evt.target.children[0].classList.contains(`preview`)) {
        evt.preventDefault();
        showImage(evt);
      }
    }
  }

  function showImage(evt) {
    imgPopup.style.display = `flex`;

    const path = evt.target.parentElement.getAttribute(`href`) ||
    evt.target.getAttribute(`href`);

    bigImage.setAttribute(`src`, path);
  }

  function hideImage() {
    imgPopup.style.display = `none`;
  }
};

export default images;
