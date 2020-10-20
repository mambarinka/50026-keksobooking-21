'use strict';

(() => {
  //  шаблон карточки объекта
  let cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  //  функция создания DOM-элемента на основе шаблона карточки объекта
  let createCard = (obj) => {
    let card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = obj.offer.title;
    card.querySelector('.popup__text--address').textContent = obj.offer.address;
    card.querySelector('.popup__text--price').textContent = `${obj.offer.price}₽/ночь`;
    card.querySelector('.popup__type').textContent = window.data.typesRus[obj.offer.type].translate;
    card.querySelector('.popup__text--capacity').textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
    card.querySelector('.popup__text--time').textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__description').textContent = obj.offer.description;
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__avatar').src = obj.author.avatar;

    setFeatures(card, obj);
    setPhotos(card, obj);

    return card;
  };

  let setFeatures = (template, ob) => {
    for (let j = 0; j < ob.offer.features.length; j++) {
      if (ob.offer.features.length) {
        let featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', `popup__feature--${ob.offer.features[j]}`);
        template.querySelector('.popup__features').append(featureItem);
      } else {
        template.querySelector('.popup__features').style = 'display: none';
      }
    }
  };

  let setPhotos = (template, ob) => {
    for (let j = 0; j < ob.offer.photos.length; j++) {
      if (ob.offer.photos.length) {
        let popupPhoto = document.createElement('img');
        popupPhoto.src = ob.offer.photos[j];
        popupPhoto.classList.add('popup__photo');
        popupPhoto.width = 45;
        popupPhoto.height = 40;
        popupPhoto.alt = "Фотография жилья";
        template.querySelector('.popup__photos').append(popupPhoto);
      } else {
        template.querySelector('.popup__photos').style = 'display: none';
      }
    }
  };

  let popup;
  let popupClose;
  let pinsContainer = document.querySelector('.map__pins');

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
    popup = pinsContainer.insertAdjacentElement('afterend', createCard(ob));
    popupClose = popup.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    popupClose.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscPress);
  };

  let onPopupEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  let onPopupEnterPress = (evt) => {
    if (evt.key === 'Enter') {
      closePopup();
    }
  };

  window.card = {
    cardTemplate,
    openPopup,
    pinsContainer
  };
})();
