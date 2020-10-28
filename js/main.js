'use strict';

(() => {
  const fieldsets = document.querySelectorAll(`fieldset`);

  // функция-обработчик для активации страницы основной (левой) кнопкой мыши
  const onPinMainMouse = (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  };

  //  функция-обработчик для активации страницы с клавиатуры клавишей enter
  const onPinMainEnter = (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };
  //  функция для перехода в НЕАКТИВНОЕ состояние страницы
  const deactivatePage = () => {
    window.pinMain.map.classList.add(`map--faded`);
    window.form.form.classList.add(`ad-form--disabled`);
    window.form.addDisabledAttribute(fieldsets);
    window.pinMain.setAddress(window.pinMain.coordsDefault);
    window.map.hideMapPins();
    window.pinMain.pinMain.addEventListener(`mousedown`, onPinMainMouse);
    window.pinMain.pinMain.addEventListener(`keydown`, onPinMainEnter);
    window.cardPopup.deletePopup();
  };

  deactivatePage();

  const resetButton = document.querySelector(`.ad-form__reset`);
  resetButton.addEventListener(`click`, () => {
    deactivatePage();
  });

  // функция для перехода в АКТИВНОЕ состояние страницы
  const activatePage = () => {
    window.pinMain.map.classList.remove(`map--faded`);
    window.form.form.classList.remove(`ad-form--disabled`);
    window.form.removeDisabledAttribute(fieldsets);
    window.pinMain.setAddress(window.pinMain.coordsCustom);
    window.backend.load(window.map.successAddPins, window.map.errorAddPins);

    window.pinMain.pinMain.removeEventListener(`mousedown`, onPinMainMouse);
    window.pinMain.pinMain.removeEventListener(`keydown`, onPinMainEnter);
  };

})();
