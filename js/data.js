'use strict';

(() => {
  const TYPES = ['palace', 'flat', 'house', 'bungalow'];
  const CHECKIN = ['12:00', '13:00', '14:00'];
  const CHECKOUT = ['12:00', '13:00', '14:00'];
  const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

  window.data = {
    TYPES,
    CHECKIN,
    CHECKOUT,
    FEATURES,
    PHOTOS,
    roomValidityMessage,
    typesRus
  };
})();
