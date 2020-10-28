'use strict';

(() => {
  const form = document.querySelector(`.ad-form`);

  //  функция добавляет атрибут disabled всем полям
  const addDisabledAttribute = (fields) => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].setAttribute(`disabled`, `disabled`);
    }
  };

  //  функция удаляет атрибут disabled всем полям
  const removeDisabledAttribute = (fields) => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].removeAttribute(`disabled`);
    }
  };

  // Зависимость кол-ва гостей от кол-ва комнат
  const room = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);

  const validateRoomsGuests = () => {
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

  room.addEventListener(`change`, validateRoomsGuests);
  capacity.addEventListener(`change`, validateRoomsGuests);
  form.addEventListener(`submit`, (evt) => {
    if (!validateRoomsGuests()) {
      evt.preventDefault();
    }
  });

  // зависимость минимальной цена за ночь от типа жилья
  const typeOfHousing = form.querySelector(`select[name="type"]`);
  const priceOfHousing = form.querySelector(`input[name="price"]`);

  const validateMinPriceOfHousing = () => {
    const type = window.data.typesRus[typeOfHousing.value];
    priceOfHousing.placeholder = type.minPrice;
    priceOfHousing.min = type.minPrice;
  };

  typeOfHousing.addEventListener(`change`, validateMinPriceOfHousing);

  // зависимость время выезда от времени заезда (и наоборот)
  const timeCheckIn = form.querySelector(`select[name="timein"]`);
  const timeCheckOut = form.querySelector(`select[name="timeout"]`);

  const changeCheckIn = (checkIn) => {
    timeCheckIn.value = checkIn;
  };

  const changeCheckOut = (checkOut) => {
    timeCheckOut.value = checkOut;
  };

  timeCheckIn.addEventListener(`change`, () => {
    changeCheckOut(timeCheckIn.value);
  });

  timeCheckOut.addEventListener(`change`, () => {
    changeCheckIn(timeCheckOut.value);
  });

  window.form = {
    addDisabledAttribute,
    removeDisabledAttribute,
    form
  };
})();
