'use strict';

(() => {
  // let objects = [];

  //  функция перемешивания чисел
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /*   // создание массива объявлений
    let createArrayObjects = () => {
      for (let i = 0; i < window.constants.OBJECTS_AMOUNT; i++) {
        let objects = [];
        objects.push(window.mock.getRandomObjects(i));
      }
      return objects;
    };

    let createArray = createArrayObjects(); */

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
