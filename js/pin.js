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

  let makeFragment = (createArray) => {
    let pinsfragment = document.createDocumentFragment();
    for (let j = 0; j < createArray.length; j++) {
      let pinElement = createPin(createArray[j]);
      pinsfragment.appendChild(pinElement);
    }
    return pinsfragment;
  };

  let showMapPins = () => {
    let fragmentWithObjects = makeFragment(window.data.objects);
    window.map.pins.appendChild(fragmentWithObjects);
  };

  let hideMapPins = () => {
    let notMainPins = window.map.pins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    notMainPins.forEach((pin) => {
      pin.remove();
    });
  };

  window.pin = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    createPin: createPin,
    showMapPins: showMapPins,
    hideMapPins: hideMapPins
  };

})();
