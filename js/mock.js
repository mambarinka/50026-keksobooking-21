'use strict';

(() => {
  let map = document.querySelector('.map');

  //  функция создания одного объекта из случайно сгенерированных массивов с данными
  let getRandomObjects = (i) => {
    let randomObject = {
      'author': {
        'avatar': `img/avatars/user0${i + 1}.png`
      },
      'offer': {
        'title': 'Заголовок предложения',
        'address': `${window.util.getRandomNumber(0, map.offsetWidth)}, ${window.util.getRandomNumber(window.constants.MAP_HEIGHT_MIN, window.constants.MAP_HEIGHT_MAX)}`,
        'price': window.util.getRandomNumber(window.constants.PRICE_MIN, window.constants.PRICE_MAX),
        'type': window.data.TYPES[window.util.getRandomNumber(0, window.data.TYPES.length - 1)],
        'rooms': window.util.getRandomNumber(window.constants.ROOMS_MIN, window.constants.ROOMS_MAX),
        'guests': window.util.getRandomNumber(window.constants.GUESTS_MIN, window.constants.GUESTS_MAX),
        'checkin': window.data.CHECKIN[window.util.getRandomNumber(0, window.data.CHECKIN.length - 1)],
        'checkout': window.data.CHECKOUT[window.util.getRandomNumber(0, window.data.CHECKOUT.length - 1)],
        'features': window.data.FEATURES.slice(0, window.util.getRandomNumber(0, window.data.FEATURES.length)),
        'description': 'Строка с описанием',
        'photos': window.data.PHOTOS.slice(0, window.util.getRandomNumber(0, window.data.PHOTOS.length))
      },
      'location': {
        'x': window.util.getRandomNumber(0, map.offsetWidth),
        'y': window.util.getRandomNumber(window.constants.MAP_HEIGHT_MIN, window.constants.MAP_HEIGHT_MAX)
      },
    };
    return randomObject;
  };

  //  функция создания массива с карточками
  let createArray = () => {
    let elements = window.util.createArrayObjects(window.constants.OBJECTS_AMOUNT, getRandomObjects);
    return elements;
  };

  window.mock = {
    map,
    getRandomObjects,
    createArray
  };
})();
