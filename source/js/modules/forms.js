import checkNumInput from './checkNumInput';
import 'whatwg-fetch';

const forms = (state) => {
  const windowForms = document.querySelectorAll(`form`);
  const inputs = document.querySelectorAll(`input`);
  const phoneInputs = document.querySelectorAll(`input[name='user_phone']`);
  const message = {
    loading: `Загрузка...`,
    success: `Спасибо! Скоро мы с вами свяжемся`,
    failure: `Что-то пошло не так...`
  };

  async function postData(url, data, messageElem) {
    messageElem.textContent = message.loading;

    let res = await fetch(url, {
      method: `POST`,
      body: data
    });

    return await res.text();
  }

  function clearInputs() {
    inputs.forEach((input) => {
      input.value = ``;
    });
  }

  function onFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const statusElem = document.createElement(`div`);
    statusElem.classList.add(`status`);
    form.appendChild(statusElem);

    const formData = new FormData(form);

    if (form.getAttribute(`data-calc`) === `end`) {
      for (const key of Object.keys(state)) {
        formData.append(key, state[key]);
      }
    }

    postData(`./../../assets/server.php`, formData, statusElem).then((res) => {
      console.log(res); /* eslint-disable-line */
      statusElem.textContent = message.success;
    }).catch(() => {
      statusElem.textContent = message.failure;
    }).finally(() => {
      clearInputs();
      setTimeout(() => {
        form.removeChild(statusElem);
      }, 5000);
    });
  }

  phoneInputs.forEach((input) => {
    checkNumInput(input);
  });

  windowForms.forEach((form) => {
    form.addEventListener(`submit`, onFormSubmit);
  });
};

export default forms;
