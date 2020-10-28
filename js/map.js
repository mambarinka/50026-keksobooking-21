'use strict';

(() => {
  //  функция показа всех пинов, загруженных с сервера
  const successAddPins = (offers) => {
    let fragmentWithObjects = window.pin.makeFragment(offers);
    window.pin.pinsContainer.appendChild(fragmentWithObjects);
  };

  const errorAddPins = (errorMessage) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  //  функция скрытия всех пинов
  const hideMapPins = () => {
    const notMainPins = window.pin.pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    notMainPins.forEach((pin) => {
      pin.remove();
    });
  };

  window.map = {
    successAddPins,
    errorAddPins,
    hideMapPins
  };
})();
