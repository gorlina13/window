function checkTab(evt) {
  const TAB_KEYCODE = 9;
  const key = evt.key || evt.keyCode;

  return key === `Tab` || key === TAB_KEYCODE;
}

function checkEsc(evt) {
  const ESC_KEYCODE = 27;
  const key = evt.key || evt.keyCode;

  return key === `Escape` || key === `Esc` || key === ESC_KEYCODE;
}

function checkSpaceBar(evt) {
  const SPACE_KEYCODE = 32;
  const key = evt.key || evt.keyCode;

  return key === ` ` || key === `Spacebar` || key === SPACE_KEYCODE;
}

function checkEnter(evt) {
  const ENTER_KEYCODE = 13;
  const key = evt.key || evt.keyCode;

  return key === `Enter` || key === ENTER_KEYCODE;
}

function checkArrowRight(evt) {
  const ARROW_RIGHT_KEYCODE = 39;
  const key = evt.key || evt.keyCode;

  return key === `ArrowRight` || key === ARROW_RIGHT_KEYCODE;
}

function checkArrowLeft(evt) {
  const ARROW_LEFT_KEYCODE = 37;
  const key = evt.key || evt.keyCode;

  return key === `ArrowLeft` || key === ARROW_LEFT_KEYCODE;
}

export {checkTab, checkEsc, checkSpaceBar, checkEnter, checkArrowRight, checkArrowLeft};
