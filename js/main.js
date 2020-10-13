'use strict';

const OBJECTS_AMOUNT = 8;

const PRICE_MIN = 1000;
const PRICE_MAX = 100000;
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS_MIN = 1;
const ROOMS_MAX = 4;
const GUESTS_MIN = 1;
const GUESTS_MAX = 4;

const roomValidityMessage = {
  1: `1 комната — «для 1 гостя»`,
  2: `2 комнаты — «для 2 гостей» или «для 1 гостя»`,
  3: `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`,
  100: `100 комнат — «не для гостей»`
};

const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const MAP_HEIGHT_MIN = 130;
const MAP_HEIGHT_MAX = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

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
      'address': `${getRandomNumber(0, map.offsetWidth)}, ${getRandomNumber(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX)}`,
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

//  функция добавляет атрибут disabled всем полям
let addDisabledAttribute = (fields) => {
  for (let i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'disabled');
  }
};

//  функция удаляет атрибут disabled всем полям
let removeDisabledAttribute = (fields) => {
  for (let i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled');
  }
};

let map = document.querySelector('.map');
let pins = document.querySelector('.map__pins');
let pinMain = document.querySelector('.map__pin--main');
let form = document.querySelector('.ad-form');
let fieldsets = document.querySelectorAll('fieldset');
let adress = document.querySelector('#address');

// функция добавляет координаты адреса в неактивном состоянии страницы
let setDefaultAddress = () => {
  let horizontalPosition = parseInt(pinMain.style.left, 10) + Math.round(pinMain.offsetWidth / 2);
  let verticalPosition = parseInt(pinMain.style.top, 10) + Math.round(pinMain.offsetHeight / 2);

  adress.value = `${horizontalPosition}, ${verticalPosition}`;
};

//  функция добавляет координаты адреса в активном состоянии страницы
let setCustomAddress = () => {
  let horizontalPosition = parseInt(pinMain.style.left, 10) + Math.round(PIN_WIDTH / 2);
  let verticalPosition = parseInt(pinMain.style.top, 10) + PIN_HEIGHT;

  adress.value = `${horizontalPosition}, ${verticalPosition}`;
};

//  шаблон карточки объекта
let cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

//  функция создания DOM-элемента на основе шаблона карточки объекта
let createCard = (template, obj) => {
  let card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = obj.offer.title;
  card.querySelector('.popup__text--address').textContent = obj.offer.address;
  card.querySelector('.popup__text--price').textContent = `${obj.offer.price}₽/ночь`;
  card.querySelector('.popup__type').textContent = typesRus[obj.offer.type].translate;
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

let createArray = createArrayObjects();

//  попап
let popup;
let popupClose;

let onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

let onPopupEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
};

//  закрытие попапа
let closePopup = () => {
  popup.remove();
  popupClose.removeEventListener('click', closePopup);
  popupClose.removeEventListener('keydown', onPopupEnterPress);
  popupClose.removeEventListener('keydown', onPopupEscPress);
};

//  открытие попапа
let openPopup = (ob) => {
  if (popup) {
    closePopup();
  }
  popup = pins.insertAdjacentElement('afterend', createCard(cardTemplate, ob));
  popupClose = popup.querySelector('.popup__close');
  popupClose.addEventListener('click', closePopup);
  popupClose.addEventListener('keydown', onPopupEnterPress);
  document.addEventListener('keydown', onPopupEscPress);
};

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
    openPopup(add);
  });

  return pin;
};

//  функция для перехода в НЕАКТИВНОЕ состояние страницы
let deactivatePage = () => {
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  addDisabledAttribute(fieldsets);
  setDefaultAddress();
};

deactivatePage();

// обработчик для активации страницы основной (левой) кнопкой мыши
pinMain.addEventListener('mouseup', (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

// обработчик для активации страницы с клавиатуры клавишей enter
pinMain.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

let pinsfragment = document.createDocumentFragment();

// функция для перехода в АКТИВНОЕ состояние страницы
let activatePage = () => {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  createArrayObjects();
  removeDisabledAttribute(fieldsets);
  setCustomAddress();

  // цикл для вывода всех меток на карту
  for (let j = 0; j < OBJECTS_AMOUNT; j++) {
    pinsfragment.appendChild(createPin(createArray[j]));
  }
  pins.appendChild(pinsfragment);

  pinMain.removeEventListener('mouseup', activatePage);
  pinMain.removeEventListener('keydown', activatePage);
};

// Зависимость кол-ва гостей от кол-ва комнат
let room = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');

let validateRoomsGuests = () => {
  let roomNumber = +room.value;
  let capacityNumber = +capacity.value;
  let result = true;

  if ((roomNumber === 100 && capacityNumber !== 0) || (roomNumber !== 100 && (capacityNumber < 1 || capacityNumber > roomNumber))) {
    capacity.setCustomValidity(roomValidityMessage[roomNumber]);
    result = false;
  } else {
    capacity.setCustomValidity(``);
  }
  capacity.reportValidity();

  return result;
};

room.addEventListener('change', validateRoomsGuests);
capacity.addEventListener('change', validateRoomsGuests);
form.addEventListener('submit', (evt) => {
  if (!validateRoomsGuests()) {
    evt.preventDefault();
  }
});

// зависимость минимальной цена за ночь от типа жилья
let typeOfHousing = form.querySelector('select[name="type"]');
let priceOfHousing = form.querySelector('input[name="price"]');

let validateMinPriceOfHousing = () => {
  let type = typesRus[typeOfHousing.value];
  priceOfHousing.placeholder = type.minPrice;
  priceOfHousing.min = type.minPrice;
};

typeOfHousing.addEventListener('change', validateMinPriceOfHousing);

// зависимость время выезда от времени заезда (и наоборот)
let timeCheckIn = form.querySelector('select[name="timein"]');
let timeCheckOut = form.querySelector('select[name="timeout"]');

let changeCheckIn = (checkIn) => {
  timeCheckIn.value = checkIn;
};

let changeCheckOut = (checkOut) => {
  timeCheckOut.value = checkOut;
};

timeCheckIn.addEventListener(`change`, () => {
  changeCheckOut(timeCheckIn.value);
});

timeCheckOut.addEventListener(`change`, () => {
  changeCheckIn(timeCheckOut.value);
});
