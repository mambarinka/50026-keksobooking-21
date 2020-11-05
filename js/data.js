'use strict';

const roomValidityMessage = {
  1: `1 комната — «для 1 гостя»`,
  2: `2 комнаты — «для 2 гостей» или «для 1 гостя»`,
  3: `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`,
  100: `100 комнат — «не для гостей»`
};

const typesRus = {
  flat: {
    translate: `Квартира`,
    minPrice: 1000,
    error: `Стоимость должна быть не меньше 1000`
  },
  bungalow: {
    translate: `Бунгало`,
    minPrice: 0,
    error: `Стоимость должна быть не меньше 0`
  },
  house: {
    translate: `Дом`,
    minPrice: 5000,
    error: `Стоимость должна быть не меньше 5000`
  },
  palace: {
    translate: `Дворец`,
    minPrice: 10000,
    error: `Стоимость должна быть не меньше 10000`
  }
};

const valuesFilterPrice = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: Number.MAX_SAFE_INTEGER
  }
};

window.data = {
  roomValidityMessage,
  typesRus,
  valuesFilterPrice
};
