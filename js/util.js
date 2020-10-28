'use strict';

(() => {

  //  функция перемешивания чисел
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // создание массива объявлений
  const createArrayObjects = (limit, getContent) => {
    let objects = [];

    for (let i = 0; i < limit; i++) {
      objects[i] = getContent(i);
    }
    return objects;
  };

  window.util = {
    getRandomNumber,
    createArrayObjects
  };
})();
