'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  //  шаблон метки
  const pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  //  функция создания DOM-элемента на основе шаблона метки
  const createPin = (object) => {
    const pin = pinTemplate.cloneNode(true);

    pin.style.left = `${object.location.x - (PIN_WIDTH / 2)}px`;
    pin.style.top = `${object.location.y - PIN_HEIGHT}px`;

    pin.querySelector('img').src = object.author.avatar;
    pin.querySelector('img').alt = object.offer.title;

    //  pin.addEventListener('click', openPopup(add));

    pin.addEventListener('click', () => {
      window.card.openPopup(object);
    });

    return pin;
  };

  // let offers = window.mock.createArray();

  const makeFragment = (elements) => {
    let pinsfragment = document.createDocumentFragment();
    for (let j = 0; j < elements.length; j++) {
      const pinElement = createPin(elements[j]);
      pinsfragment.appendChild(pinElement);
    }
    return pinsfragment;
  };

  //  let showMapPins = () => {
  //  let fragmentWithObjects = makeFragment(offers);
  //  window.card.pinsContainer.appendChild(fragmentWithObjects);
  // };

  // let hideMapPins = () => {
  // let notMainPins = window.card.pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  //  notMainPins.forEach((pin) => {
  //  pin.remove();
  //  });
  //  };

  window.pin = {
    PIN_WIDTH,
    PIN_HEIGHT,
    createPin,
    // showMapPins,
    // hideMapPins,
    makeFragment
  };

})();
