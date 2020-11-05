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

  const createErrorMessage = (message) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  //  функция добавляет атрибут disabled
  const addDisabledAttribute = (form, fields) => {
    form.reset();
    for (let i = 0; i < fields.length; i++) {
      fields[i].setAttribute(`disabled`, `disabled`);
    }
  };

  //  функция удаляет атрибут disabled
  const removeDisabledAttribute = (fields) => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].removeAttribute(`disabled`);
    }
  };

  window.util = {
    getRandomNumber,
    createArrayObjects,
    createErrorMessage,
    addDisabledAttribute,
    removeDisabledAttribute
  };
})();
