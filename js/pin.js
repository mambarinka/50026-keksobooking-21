'use strict';

(() => {
  let pinsContainer = document.querySelector(`.map__pins`);
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  //  шаблон метки
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  //  функция создания DOM-элемента на основе шаблона метки
  const createPin = (object) => {
    const pin = pinTemplate.cloneNode(true);

    pin.style.left = `${object.location.x - (PIN_WIDTH / 2)}px`;
    pin.style.top = `${object.location.y - PIN_HEIGHT}px`;

    pin.querySelector(`img`).src = object.author.avatar;
    pin.querySelector(`img`).alt = object.offer.title;

    pin.addEventListener(`click`, () => {
      window.cardPopup.openPopup(object);
    });

    return pin;
  };

  //  функция создания всех меток с помощью группировки createDocumentFragment
  const makeFragment = (elements) => {
    let pinsfragment = document.createDocumentFragment();
    for (let j = 0; j < elements.length; j++) {
      const pinElement = createPin(elements[j]);
      pinsfragment.appendChild(pinElement);
    }
    return pinsfragment;
  };

  window.pin = {
    pinsContainer,
    PIN_WIDTH,
    PIN_HEIGHT,
    createPin,
    makeFragment
  };

})();
