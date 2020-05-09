const modal = () => {
  const ESC_KEYCODE = 27;
  const TAB_KEYCODE = 9;
  const SPACE_KEYCODE = 32;
  const elems = document.querySelectorAll(`[data-modal]`);
  const scrollBarWidth = calcScrollBarWidth();
  let shownModal;

  function calcScrollBarWidth() {
    const div = document.createElement(`div`);

    div.style.width = `50px`;
    div.style.height = `50px`;
    div.style.overflowY = `scroll`;
    div.style.visibility = `hidden`;
    document.body.appendChild(div);

    const barWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return barWidth;
  }

  function setTabStops(modalElem) {
    const FOCUSABLE_ELEMENTS_SELECTOR = `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]`;
    const focusableElements = modalElem.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);

    modalElem.firstTabStop = focusableElements[0];
    modalElem.lastTabStop = focusableElements[focusableElements.length - 1];
  }

  function saveStartPoint(modalElem) {
    modalElem.startPoint = document.activeElement;
  }

  function hideModals() {
    elems.forEach((item) => {
      item.style.display = `none`;
    });
  }

  function checkTab(evt) {
    const key = evt.key || evt.keyCode;
    return key === `Tab` || key === TAB_KEYCODE;
  }

  function checkEsc(evt) {
    const key = evt.key || evt.keyCode;
    return key === `Escape` || key === `Esc` || key === ESC_KEYCODE;
  }

  function checkSpaceBar(evt) {
    const key = evt.key || evt.keyCode;
    return key === ` ` || key === `Spacebar` || key === SPACE_KEYCODE;
  }

  function showModal(modalElem) {
    modalElem.style.display = `block`;
  }

  function disableScrolling() {
    const widthBefore = document.body.clientWidth;
    document.body.style.overflow = `hidden`;

    if (document.body.clientWidth > widthBefore) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
  }

  function enableScrolling() {
    const widthBefore = document.body.clientWidth;
    document.body.style.overflow = ``;

    if (document.body.clientWidth < widthBefore) {
      document.body.style.paddingRight = `0`;
    }
  }

  function setup({
    selectors: [triggerSelector, modalSelector, closeSelector],
    closeOnOverlayClick = true,
    showByTime = false,
    time = null
  }) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modalElem = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);

    setTabStops(modalElem);
    close.setAttribute(`aria-label`, `Закрыть окно`);

    triggers.forEach((item) => {
      item.addEventListener(`click`, onTriggerClick);

      if (item.tagName === `A`) {
        item.setAttribute(`role`, `button`);
        item.addEventListener(`keydown`, onTriggerKeydown);
      }
    });

    modalElem.addEventListener(`click`, onModalClick);

    if (time !== null && showByTime) {
      showModalByTime();
    }

    function onTriggerClick(evt) {
      evt.preventDefault();
      openDialog();
    }

    function onTriggerKeydown(evt) {
      if (checkSpaceBar(evt)) {
        evt.preventDefault();
        openDialog();
      }
    }

    function onModalClick(evt) {
      if (evt.target === modalElem && closeOnOverlayClick) {
        closeDialog();
      } else if (evt.target.closest(closeSelector)) {
        evt.preventDefault();
        closeDialog();
      }
    }

    function openDialog() {
      saveStartPoint(modalElem);
      hideModals();
      window.addEventListener(`keydown`, onWindowKeydown);
      showModal(modalElem);
      shownModal = modalElem;
      modalElem.firstTabStop.focus();
      disableScrolling();
    }

    function onWindowKeydown(evt) {
      if (checkTab(evt)) {
        // If Shift + Tab
        if (evt.shiftKey) {
          if (document.activeElement === modalElem.firstTabStop) {
            evt.preventDefault();
            modalElem.lastTabStop.focus();
          }
        // if Tab
        } else {
          if (document.activeElement === modalElem.lastTabStop) {
            evt.preventDefault();
            modalElem.firstTabStop.focus();
          }
        }
      }

      // if Esc
      if (checkEsc(evt)) {
        if (shownModal) {
          evt.preventDefault();
          closeDialog();
        }
      }
    }

    function closeDialog() {
      hideModals();
      window.removeEventListener(`keydown`, onWindowKeydown);
      shownModal = null;
      modalElem.startPoint.focus();
      enableScrolling();
    }

    function showModalByTime() {
      setTimeout(() => {
        if (!shownModal) {
          openDialog();
        }
      }, time);
    }
  }

  setup({
    selectors: [`.popup_engineer_btn`, `.popup_engineer`, `.popup_engineer .popup_close`]
  });
  setup({
    selectors: [`.phone_link`, `.popup`, `.popup .popup_close`],
    showByTime: true,
    time: 60000
  });
  setup({
    selectors: [`.popup_calc_btn`, `.popup_calc`, `.popup_calc_close`]
  });
  setup({
    selectors: [`.popup_calc_button`, `.popup_calc_profile`, `.popup_calc_profile_close`],
    closeOnOverlayClick: false
  });
  setup({
    selectors: [`.popup_calc_profile_button`, `.popup_calc_end`, `.popup_calc_end_close`],
    closeOnOverlayClick: false
  });
};

export default modal;
