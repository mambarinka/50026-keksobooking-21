'use strict';

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
const MAP_WIDTH = 1200;
const MAP_HEIGHT_MIN = 130;
const MAP_HEIGHT_MAX = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

let typesRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
let objects = [];

//  функция перемешивания чисел
let getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция получения массива случайной длины
let getRandomArray = (array) => {
  let randomArray = array.slice(0, Math.floor(Math.random() * array.length));
  return randomArray;
};

//  функция создания одного объекта из случайно сгенерированных массивов с данными
let getRandomObjects = (i) => {
  let randomObject = {
    'author': {
      'avatar': `img/avatars/user0${i + 1}.png`
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': `${getRandomNumber(0, MAP_WIDTH)}, ${getRandomNumber(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX)}`,
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
      'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      'checkin': CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
      'checkout': CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      'features': getRandomArray(FEATURES),
      'description': 'Строка с описанием',
      'photos': getRandomArray(PHOTOS)
    },
    'location': {
      'x': getRandomNumber(0, MAP_WIDTH),
      'y': getRandomNumber(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX)
    },
  };
  return randomObject;
};

let map = document.querySelector('.map');
let pins = document.querySelector('.map__pins');

map.classList.remove('map--faded');

//  шаблон метки
let pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');


//  функция создания DOM-элемента на основе шаблона метки
let createPin = (add) => {
  let pin = pinTemplate.cloneNode(true);

  pin.style.left = `${add.location.x - PIN_WIDTH / 2}px`;
  pin.style.top = `${add.location.y - PIN_HEIGHT}px`;

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


//  шаблон карточки объекта
let cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

//  функция создания DOM-элемента на основе шаблона карточки объекта
let createCard = (obj) => {
  let card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = obj.offer.title;
  card.querySelector('.popup__text--address').textContent = obj.offer.address;
  card.querySelector('.popup__text--price').textContent = `${obj.offer.price}₽/ночь`;
  card.querySelector('.popup__type').textContent = typesRus[obj.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__description').textContent = obj.offer.description;
  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__avatar').src = obj.author.avatar;

  let popupFeatures = card.querySelector('.popup__features');

  for (let j = 0; j < obj.offer.features.length; j++) {
    if (obj.offer.features.length) {
      let featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', `popup__feature--${obj.offer.features[j]}`);
      popupFeatures.append(featureItem);
    } else {
      popupFeatures.style = 'display: none';
    }
  }

  let popupPhotos = card.querySelector('.popup__photos');

  for (let j = 0; j < obj.offer.photos.length; j++) {
    if (obj.offer.photos.length) {
      let popupPhoto = document.createElement('img');
      popupPhoto.src = obj.offer.photos[j];
      popupPhoto.classList.add('popup__photo');
      popupPhoto.width = 45;
      popupPhoto.height = 40;
      popupPhoto.alt = "Фотография жилья";
      popupPhotos.append(popupPhoto);
    } else {
      popupPhotos.style = 'display: none';
    }
  }

  return card;
};

let filtersContainer = map.querySelector('.map__filters-container');

//  отображение карточки первого объявления из массива с данными
filtersContainer.insertAdjacentElement('beforebegin', createCard((objects[0])));
