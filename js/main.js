'use strict';

(() => {
  let fieldsets = document.querySelectorAll('fieldset');

  //  функция для перехода в НЕАКТИВНОЕ состояние страницы
  let deactivatePage = () => {
    window.mock.map.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');
    window.form.addDisabledAttribute(fieldsets);
    window.form.setDefaultAddress();
    window.pin.hideMapPins();
  };

  let resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', () => {
    deactivatePage();
  });

  // обработчик для активации страницы основной (левой) кнопкой мыши
  window.form.pinMain.addEventListener('mouseup', (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  });

  // обработчик для активации страницы с клавиатуры клавишей enter
  window.form.pinMain.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      activatePage();
    }
  });

  // функция для перехода в АКТИВНОЕ состояние страницы
  let activatePage = () => {
    window.mock.map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    // window.util.createArrayObjects();
    window.mock.createArray();
    window.form.removeDisabledAttribute(fieldsets);
    window.form.setCustomAddress();

    window.pin.showMapPins();

    window.form.pinMain.removeEventListener('mouseup', activatePage);
    window.form.pinMain.removeEventListener('keydown', activatePage);
  };
})();
