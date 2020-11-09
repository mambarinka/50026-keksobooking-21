'use strict';

//  функция перемешивания чисел
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

const disableElement = (element) => {
  element.disabled = true;
};

const enableElement = (element) => {
  element.disabled = false;
};

//  функция добавляет атрибут disabled
const addDisabledAttribute = (form, fields) => {
  form.reset();
  fields.forEach(disableElement);
};

//  функция удаляет атрибут disabled
const removeDisabledAttribute = (fields) => {
  fields.forEach(enableElement);
};

window.util = {
  getRandomNumber,
  createErrorMessage,
  addDisabledAttribute,
  removeDisabledAttribute
};
