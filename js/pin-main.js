'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const address = document.querySelector(`#address`);
  const PIN_MAIN_CURSOR_HEIGHT = 22;
  const MAP_HEIGHT_MIN = 130;
  const MAP_HEIGHT_MAX = 630;

  const coordsDefault = {
    x: parseInt(pinMain.style.left, 10) + Math.round(pinMain.offsetWidth / 2),
    y: parseInt(pinMain.style.top, 10) + Math.round(pinMain.offsetHeight / 2)
  };
  const coordsCustom = {
    x: parseInt(pinMain.style.left, 10) + Math.round(pinMain.offsetWidth / 2),
    y: parseInt(pinMain.style.top, 10) + pinMain.offsetHeight + PIN_MAIN_CURSOR_HEIGHT
  };

  const setAddress = (coords) => {
    address.value = `${coords.x}, ${coords.y}`;
  };

  setAddress(coordsCustom);

  let newCoordsCustom;

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinMain.offsetLeft - shift.x >= 0 &&
        pinMain.offsetLeft - shift.x + pinMain.offsetWidth <= map.offsetWidth &&
        pinMain.offsetTop - shift.y + pinMain.offsetHeight >= MAP_HEIGHT_MIN &&
        pinMain.offsetTop - shift.y + pinMain.offsetHeight <= MAP_HEIGHT_MAX) {

        pinMain.style.left = (pinMain.offsetLeft - shift.x) + `px`;
        pinMain.style.top = (pinMain.offsetTop - shift.y) + `px`;

        newCoordsCustom = {
          x: pinMain.offsetLeft - shift.x,
          y: pinMain.offsetTop - shift.y
        };

        setAddress(newCoordsCustom);
      }
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.pinMain = {
    map,
    pinMain,
    coordsDefault,
    coordsCustom,
    setAddress
  };
})();