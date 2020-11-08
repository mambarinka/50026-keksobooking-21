'use strict';

// Зависимость кол-ва гостей от кол-ва комнат
const room = document.querySelector(`#room_number`);
const capacity = document.querySelector(`#capacity`);

const onValidateRoomsGuests = () => {
  let roomNumber = +room.value;
  let capacityNumber = +capacity.value;

  const isInvalidOption = window.data.capacityValidityOptions[roomNumber].some((option) => {
    return Number(capacityNumber) === option;
  });
  return !isInvalidOption ?
    capacity.setCustomValidity(window.data.roomValidityMessage[roomNumber]) :
    capacity.setCustomValidity(``);
};

room.addEventListener(`change`, onValidateRoomsGuests);
capacity.addEventListener(`change`, onValidateRoomsGuests);
window.form.adForm.addEventListener(`submit`, (evt) => {
  if (!onValidateRoomsGuests()) {
    evt.preventDefault();
  }
});

// зависимость минимальной цена за ночь от типа жилья
const typeOfHousing = window.form.adForm.querySelector(`select[name="type"]`);
const priceOfHousing = window.form.adForm.querySelector(`input[name="price"]`);
let result = true;


const onValidateMinPriceOfHousing = (evt) => {
  if (evt) {
    const price = evt.target.value;
    const type = window.data.typesRus[typeOfHousing.value];
    priceOfHousing.placeholder = type.minPrice;
    priceOfHousing.min = type.minPrice;

    if (price < type.minPrice) {
      priceOfHousing.setCustomValidity(window.data.typesRus[typeOfHousing.value].error);
      result = false;
    } else {
      priceOfHousing.setCustomValidity(``);
      result = true;
    }
    priceOfHousing.reportValidity();
  }
  return result;
};

const priceReset = () => {
  const type = window.data.typesRus.flat;
  priceOfHousing.placeholder = type.minPrice;
  priceOfHousing.min = type.minPrice;
};

typeOfHousing.addEventListener(`change`, onValidateMinPriceOfHousing);
priceOfHousing.addEventListener(`change`, onValidateMinPriceOfHousing);

window.form.adForm.addEventListener(`submit`, (evt) => {
  if (!onValidateMinPriceOfHousing(evt)) {
    evt.preventDefault();
  }
});

// зависимость время выезда от времени заезда (и наоборот)
const timeCheckIn = window.form.adForm.querySelector(`select[name="timein"]`);
const timeCheckOut = window.form.adForm.querySelector(`select[name="timeout"]`);

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

window.formValidation = {
  priceReset
};
