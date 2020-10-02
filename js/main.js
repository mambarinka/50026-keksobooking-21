'use strict';

const OBJECTS_AMOUNT = 8;

const PRICE_MIN = 1000;
const PRICE_MAX = 100000;
const TYPES = ['palace', 'flat', 'house', 'bungalo'];
const ROOMS_MIN = 1;
const ROOMS_MAX = 4;
const GUESTS_MIN = 1;
const GUESTS_MAX = 4;
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const MAP_WIDTH = 1200;
const MAP_HEIGHT_MIN = 130;
const MAP_HEIGHT_MAX = 630;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 70;

let objects = [];

//  функция перемешивания чисел
let getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//  функция нахождения координаты по Х (рандомно)
let getLocationX = function () {
  return Math.floor(Math.random() * MAP_WIDTH);
};

//  функция нахождения координаты по Y (рандомно)
let getLocationY = function () {
  return Math.floor(Math.random() * (MAP_HEIGHT_MAX - MAP_HEIGHT_MIN) + MAP_HEIGHT_MIN);
};

//  функция получения изображения аватара
function getAvatarCount(i) {
  var avatarNumber = '0' + (i + 1);
  return 'img/avatars/user' + avatarNumber + '.png';
}

//  функция создания одного объекта из случайно сгенерированных массивов с данными
let getRandomObjects = function (i) {
  let randomObject = {
    'author': {
      'avatar': getAvatarCount(i)
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': `$(getLocationX()), $(getLocationY())`,
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
      'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      'checkin': CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
      'checkout': CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      'features': FEATURES[getRandomNumber(0, FEATURES.length - 1)],
      'description': 'Строка с описанием',
      'photos': PHOTOS[getRandomNumber(0, PHOTOS.length - 1)]
    },
    'location': {
      'x': getLocationX(),
      'y': getLocationY()
    },
  };
  return randomObject;
};

// функция создания массива из 8 сгенерированных JS объектов
/* let createObjects = function () {
  for (let i = 0; i < OBJECTS_AMOUNT; i++) {
    let object = getRandomObjects(i);
    objects.push(object[i]);
  }
}

createObjects(); */

let map = document.querySelector('.map');
let pins = document.querySelector('.map__pins');

map.classList.remove('map--faded');
let pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');


//  функция создания DOM-элемента на основе JS-объекта (шаблон мага)
let createPin = function (add) {
  let pin = pinTemplate.cloneNode(true);

  pin.style.left = add.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = add.location.y - PIN_HEIGHT + 'px';

  pin.querySelector('img').src = add.author.avatar;
  pin.querySelector('img').alt = add.offer.title;

  return pin;
};

// цикл для вывода всех меток на карту
let pinsfragment = document.createDocumentFragment();
for (let i = 0; i < OBJECTS_AMOUNT; i++) {
  objects.push(getRandomObjects(i));
  pinsfragment.appendChild(createPin(objects[i]));
}

pins.appendChild(pinsfragment);
