const timer = (selector, deadline) => {
  function addZero(num) {
    if (num <= 9) {
      return `0` + num;
    } else {
      return num;
    }
  }

  function getTimeRemaining() {
    const t = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor((t / (1000 * 60 * 60 * 24)));

    return {
      total: t,
      seconds,
      minutes,
      hours,
      days
    };
  }

  function setClock() {
    const IDS = [`days`, `hours`, `minutes`, `seconds`];
    const timerElem = document.querySelector(selector);
    const elems = IDS.map((id) => timerElem.querySelector(`#${id}`));

    const timeInterval = setInterval(updateClock, 1000);
    updateClock();


    function updateClock() {
      const t = getTimeRemaining();

      if (t.total <= 0) {
        elems.forEach((elem) => {
          elem.textContent = `00`;
        });

        clearInterval(timeInterval);
      } else {
        elems.forEach((elem) => {
          elem.textContent = addZero(t[elem.getAttribute(`id`)]);
        });
      }
    }
  }

  setClock();
};

export default timer;
