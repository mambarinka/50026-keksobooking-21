'use strict';

(() => {
  const fieldsets = document.querySelectorAll('fieldset');

  //  функция для перехода в НЕАКТИВНОЕ состояние страницы
  const deactivatePage = () => {
    window.mock.map.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');
    window.form.addDisabledAttribute(fieldsets);
    window.pinMain.setAddress(window.pinMain.coordsDefault);
    window.map.hideMapPins();
  };

  deactivatePage();

  const resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', () => {
    deactivatePage();
  });

  // обработчик для активации страницы основной (левой) кнопкой мыши
  window.pinMain.pinMain.addEventListener('mousedown', (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  });

  // обработчик для активации страницы с клавиатуры клавишей enter
  window.pinMain.pinMain.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      activatePage();
    }
  });

  // функция для перехода в АКТИВНОЕ состояние страницы
  const activatePage = () => {
    window.mock.map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    // window.util.createArrayObjects();
    //  window.mock.createArray();
    window.map.getRandomCards();
    window.form.removeDisabledAttribute(fieldsets);
    window.pinMain.setAddress(window.pinMain.coordsCustom);

    window.map.showMapPins();

    window.pinMain.pinMain.removeEventListener('mouseup', activatePage);
    window.pinMain.pinMain.removeEventListener('keydown', activatePage);
  };
})();
