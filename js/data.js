'use strict';

(() => {
  const OBJECTS_AMOUNT = 8;

  const PRICE_MIN = 1000;
  const PRICE_MAX = 100000;
  const TYPES = ['palace', 'flat', 'house', 'bungalow'];
  const ROOMS_MIN = 1;
  const ROOMS_MAX = 4;
  const GUESTS_MIN = 1;
  const GUESTS_MAX = 4;

  const CHECKIN = ['12:00', '13:00', '14:00'];
  const CHECKOUT = ['12:00', '13:00', '14:00'];
  const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const MAP_HEIGHT_MIN = 130;
  const MAP_HEIGHT_MAX = 630;

  let objects = [];

  const roomValidityMessage = {
    1: `1 комната — «для 1 гостя»`,
    2: `2 комнаты — «для 2 гостей» или «для 1 гостя»`,
    3: `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`,
    100: `100 комнат — «не для гостей»`
  };

  let typesRus = {
    flat: {
      translate: 'Квартира',
      minPrice: 1000
    },
    bungalow: {
      translate: 'Бунгало',
      minPrice: 0
    },
    house: {
      translate: 'Дом',
      minPrice: 5000
    },
    palace: {
      translate: 'Дворец',
      minPrice: 10000
    }
  };

  let map = document.querySelector('.map');

  //  функция перемешивания чисел
  let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //  функция создания одного объекта из случайно сгенерированных массивов с данными
  let getRandomObjects = (i) => {
    let randomObject = {
      'author': {
        'avatar': `img/avatars/user0${i + 1}.png`
      },
      'offer': {
        'title': 'Заголовок предложения',
        'address': `${getRandomNumber(0, map.offsetWidth)}, ${getRandomNumber(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX)}`,
        'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
        'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
        'checkout': CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
        'features': FEATURES.slice(0, getRandomNumber(0, FEATURES.length)),
        'description': 'Строка с описанием',
        'photos': PHOTOS.slice(0, getRandomNumber(0, PHOTOS.length))
      },
      'location': {
        'x': getRandomNumber(0, map.offsetWidth),
        'y': getRandomNumber(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX)
      },
    };
    return randomObject;
  };

  // создание массива объявлений
  let createArrayObjects = () => {
    for (let i = 0; i < OBJECTS_AMOUNT; i++) {
      objects.push(getRandomObjects(i));
    }
    return objects;
  };

  window.data = {
    roomValidityMessage: roomValidityMessage,
    typesRus: typesRus,
    createArrayObjects: createArrayObjects,
    map: map,
    objects: objects
  };
})();
