const checkNumInput = (inputElem) => {
  inputElem.addEventListener(`input`, () => {
    inputElem.value = inputElem.value.replace(/\D/g, ``);
  });
};

export default checkNumInput;
