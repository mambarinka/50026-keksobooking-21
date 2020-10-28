'use strict';

(() => {
  const roomValidityMessage = {
    1: `1 комната — «для 1 гостя»`,
    2: `2 комнаты — «для 2 гостей» или «для 1 гостя»`,
    3: `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`,
    100: `100 комнат — «не для гостей»`
  };

  const typesRus = {
    flat: {
      translate: `Квартира`,
      minPrice: 1000
    },
    bungalow: {
      translate: `Бунгало`,
      minPrice: 0
    },
    house: {
      translate: `Дом`,
      minPrice: 5000
    },
    palace: {
      translate: `Дворец`,
      minPrice: 10000
    }
  };

  window.data = {
    roomValidityMessage,
    typesRus
  };
})();
