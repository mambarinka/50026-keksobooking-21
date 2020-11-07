'use strict';

//  функция для перехода в НЕАКТИВНОЕ состояние страницы
const deactivatePage = () => {
  window.pinMain.map.classList.add(`map--faded`);
  window.map.deactivateMap();
  window.form.deactivateAdForm();
  window.filters.deactivateFilter();
};

deactivatePage();

// функция для перехода в АКТИВНОЕ состояние страницы
const activatePage = () => {
  window.pinMain.map.classList.remove(`map--faded`);
  window.map.activateMap();
  window.form.activateAdForm();
  window.filters.activateFilter();
};

window.main = {
  deactivatePage,
  activatePage
};
