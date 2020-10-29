'use strict';

(() => {
  let popup;
  let popupClose;

  const deletePopup = () => {
    if (popup) {
      popup.remove();
    }
  };

  //  открытие попапа (карточки объявления)
  const openPopup = (object) => {
    if (popup) {
      closePopup();
    }
    popup = window.pin.pinsContainer.insertAdjacentElement(`afterend`, window.cardCreate.createCard(object));
    popupClose = popup.querySelector(`.popup__close`);
    popupClose.addEventListener(`click`, closePopup);
    popupClose.addEventListener(`keydown`, onPopupEnterPress);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  //  закрытие попапа (карточки объявления)
  const closePopup = () => {
    deletePopup();
    popupClose.removeEventListener(`click`, closePopup);
    popupClose.removeEventListener(`keydown`, onPopupEnterPress);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };

  const onPopupEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      closePopup();
    }
  };

  window.cardPopup = {
    deletePopup,
    openPopup
  };
})();
