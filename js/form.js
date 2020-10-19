'use strict';

(() => {
  let form = document.querySelector('.ad-form');
  let adress = document.querySelector('#address');
  let pinMain = document.querySelector('.map__pin--main');

  //  функция добавляет атрибут disabled всем полям
  let addDisabledAttribute = (fields) => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'disabled');
    }
  };

  //  функция удаляет атрибут disabled всем полям
  let removeDisabledAttribute = (fields) => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
  };

  // функция добавляет координаты адреса в неактивном состоянии страницы
  let setDefaultAddress = () => {
    let horizontalPosition = parseInt(pinMain.style.left, 10) + Math.round(pinMain.offsetWidth / 2);
    let verticalPosition = parseInt(pinMain.style.top, 10) + Math.round(pinMain.offsetHeight / 2);

    adress.value = `${horizontalPosition}, ${verticalPosition}`;
  };

  //  функция добавляет координаты адреса в активном состоянии страницы
  let setCustomAddress = () => {
    let horizontalPosition = parseInt(pinMain.style.left, 10) + Math.round(window.pin.PIN_WIDTH / 2);
    let verticalPosition = parseInt(pinMain.style.top, 10) + window.pin.PIN_HEIGHT;

    adress.value = `${horizontalPosition}, ${verticalPosition}`;
  };

  // Зависимость кол-ва гостей от кол-ва комнат
  let room = document.querySelector('#room_number');
  let capacity = document.querySelector('#capacity');

  let validateRoomsGuests = () => {
    let roomNumber = +room.value;
    let capacityNumber = +capacity.value;
    let result = true;

    if ((roomNumber === 100 && capacityNumber !== 0) || (roomNumber !== 100 && (capacityNumber < 1 || capacityNumber > roomNumber))) {
      capacity.setCustomValidity(window.data.roomValidityMessage[roomNumber]);
      result = false;
    } else {
      capacity.setCustomValidity(``);
    }
    capacity.reportValidity();

    return result;
  };

  room.addEventListener('change', validateRoomsGuests);
  capacity.addEventListener('change', validateRoomsGuests);
  form.addEventListener('submit', (evt) => {
    if (!validateRoomsGuests()) {
      evt.preventDefault();
    }
  });

  // зависимость минимальной цена за ночь от типа жилья
  let typeOfHousing = form.querySelector('select[name="type"]');
  let priceOfHousing = form.querySelector('input[name="price"]');

  let validateMinPriceOfHousing = () => {
    let type = window.data.typesRus[typeOfHousing.value];
    priceOfHousing.placeholder = type.minPrice;
    priceOfHousing.min = type.minPrice;
  };

  typeOfHousing.addEventListener('change', validateMinPriceOfHousing);

  // зависимость время выезда от времени заезда (и наоборот)
  let timeCheckIn = form.querySelector('select[name="timein"]');
  let timeCheckOut = form.querySelector('select[name="timeout"]');

  let changeCheckIn = (checkIn) => {
    timeCheckIn.value = checkIn;
  };

  let changeCheckOut = (checkOut) => {
    timeCheckOut.value = checkOut;
  };

  timeCheckIn.addEventListener(`change`, () => {
    changeCheckOut(timeCheckIn.value);
  });

  timeCheckOut.addEventListener(`change`, () => {
    changeCheckIn(timeCheckOut.value);
  });

  window.form = {
    addDisabledAttribute: addDisabledAttribute,
    removeDisabledAttribute: removeDisabledAttribute,
    setDefaultAddress: setDefaultAddress,
    setCustomAddress: setCustomAddress,
    form: form,
    pinMain: pinMain
  };
})();
