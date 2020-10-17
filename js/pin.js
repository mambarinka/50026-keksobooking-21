'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  //  шаблон метки
  let pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  //  функция создания DOM-элемента на основе шаблона метки
  let createPin = (add) => {
    let pin = pinTemplate.cloneNode(true);

    pin.style.left = `${add.location.x - (PIN_WIDTH / 2)}px`;
    pin.style.top = `${add.location.y - PIN_HEIGHT}px`;

    pin.querySelector('img').src = add.author.avatar;
    pin.querySelector('img').alt = add.offer.title;

    //  pin.addEventListener('click', openPopup(add));

    pin.addEventListener('click', () => {
      window.map.openPopup(add);
    });

    return pin;
  };

  window.pin = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    createPin: createPin
  };

})();
