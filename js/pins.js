'use strict';

(() => {
  const pinsContainer = document.querySelector(`.map__pins`);
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
      addActiveClassPin(pin);
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

  window.objects = [];

  //  функция показа всех пинов, загруженных с сервера
  const onSuccessAddPins = (offers) => {
    window.objects = offers;
    let fragmentWithObjects = makeFragment(window.objects.slice(0, window.filters.MAX_NUMBER_PIN));
    pinsContainer.appendChild(fragmentWithObjects);
  };

  const onErrorAddPins = (errorMessage) => {
    window.util.createErrorMessage(errorMessage);
  };

  //  функция скрытия всех пинов
  const hideMapPins = () => {
    const notMainPins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    notMainPins.forEach((pin) => {
      pin.remove();
    });
  };

  const deleteActiveClassPin = () => {
    const activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const addActiveClassPin = (pin) => {
    deleteActiveClassPin();
    pin.classList.add(`map__pin--active`);
  };

  window.pins = {
    pinsContainer,
    PIN_WIDTH,
    PIN_HEIGHT,
    onSuccessAddPins,
    onErrorAddPins,
    hideMapPins,
    deleteActiveClassPin
  };

})();
