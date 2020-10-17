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

  let form = document.querySelector('.ad-form');
  let fieldsets = document.querySelectorAll('fieldset');
  let adress = document.querySelector('#address');
  let pinMain = document.querySelector('.map__pin--main');

  // функция добавляет координаты адреса в неактивном состоянии страницы
  let setDefaultAddress = () => {
    let horizontalPosition = parseInt(pinMain.style.left, 10) + Math.round(pinMain.offsetWidth / 2);
    let verticalPosition = parseInt(pinMain.style.top, 10) + Math.round(pinMain.offsetHeight / 2);

    adress.value = `${horizontalPosition}, ${verticalPosition}`;
  };

  //  функция добавляет координаты адреса в активном состоянии страницы
  let setCustomAddress = () => {
    let horizontalPosition = parseInt(pinMain.style.left, 10) + Math.round(window.pin.PIN_WIDTH / 2);
    let verticalPosition = parseInt(pinMain.style.top, 10) + window.pin.PIN_HEIGHT;

    adress.value = `${horizontalPosition}, ${verticalPosition}`;
  };

  let map = document.querySelector('.map');
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

  // функция для перехода в АКТИВНОЕ состояние страницы
  let activatePage = () => {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    createArrayObjects();
    removeDisabledAttribute(fieldsets);
    setCustomAddress();

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

  window.main = {
    OBJECTS_AMOUNT: OBJECTS_AMOUNT,
    createArrayObjects: createArrayObjects,
    typesRus: typesRus
  };
})();
