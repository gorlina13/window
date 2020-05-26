const checkKey = (evt, keyString) => {
  const TAB_KEYCODE = 9;
  const ESC_KEYCODE = 27;
  const SPACE_KEYCODE = 32;
  const ENTER_KEYCODE = 13;
  const ARROW_RIGHT_KEYCODE = 39;
  const ARROW_LEFT_KEYCODE = 37;
  const ARROW_DOWN_KEYCODE = 40;

  const key = evt.key || evt.keyCode;
  let check;

  switch (keyString) {
    case `Tab`:
      check = key === keyString || key === TAB_KEYCODE;
      break;

    case `Escape`:
      check = key === keyString || key === `Esc` || key === ESC_KEYCODE;
      break;

    case ` `:
      check = key === keyString || key === `Spacebar` || key === SPACE_KEYCODE;
      break;

    case `Enter`:
      check = key === keyString || key === ENTER_KEYCODE;
      break;

    case `ArrowRight`:
      check = key === keyString || key === `Right` || key === ARROW_RIGHT_KEYCODE;
      break;

    case `ArrowLeft`:
      check = key === keyString || key === `Left` || key === ARROW_LEFT_KEYCODE;
      break;

    case `ArrowDown`:
      check = key === keyString || key === `Down` || key === ARROW_DOWN_KEYCODE;
      break;
  }

  return check;
};

export {checkKey};
