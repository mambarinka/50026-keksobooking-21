'use strict';

(() => {
  // функция-обработчик для активации страницы основной (левой) кнопкой мыши
  const onPinMainMouse = (evt) => {
    if (evt.button === 0) {
      window.main.activatePage();
    }
  };

  //  функция-обработчик для активации страницы с клавиатуры клавишей enter
  const onPinMainEnter = (evt) => {
    if (evt.key === `Enter`) {
      window.main.activatePage();
    }
  };

  //  функция для деактивации карты
  const deactivateMap = () => {
    window.pinMain.pinMain.addEventListener(`mousedown`, onPinMainMouse);
    window.pinMain.pinMain.addEventListener(`keydown`, onPinMainEnter);
    window.pinMain.getMainPinDefault();
    window.pins.hideMapPins();
    window.cardPopup.deletePopup();
  };

  //  функция для активации карты
  const activateMap = () => {
    window.pinMain.pinMain.removeEventListener(`mousedown`, onPinMainMouse);
    window.pinMain.pinMain.removeEventListener(`keydown`, onPinMainEnter);
    window.backend.load(window.pins.onSuccessAddPins, window.pins.onErrorAddPins);
  };

  window.map = {
    deactivateMap,
    activateMap
  };
})();
