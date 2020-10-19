'use strict';

(() => {
  let popup;
  let popupClose;
  let pins = document.querySelector('.map__pins');

  let onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  let onPopupEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  };

  //  закрытие попапа
  let closePopup = () => {
    popup.remove();
    popupClose.removeEventListener('click', closePopup);
    popupClose.removeEventListener('keydown', onPopupEnterPress);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  //  открытие попапа
  let openPopup = (ob) => {
    if (popup) {
      closePopup();
    }
    popup = pins.insertAdjacentElement('afterend', window.card.createCard(ob));
    popupClose = popup.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    popupClose.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.map = {
    openPopup: openPopup,
    pins: pins
  };
})();
