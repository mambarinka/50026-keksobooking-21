'use strict';

(() => {
  //  шаблон карточки объекта
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  //  функция создания DOM-элемента на основе шаблона карточки объекта
  const createCard = (object) => {
    let card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = object.offer.title;
    card.querySelector('.popup__text--address').textContent = object.offer.address;
    card.querySelector('.popup__text--price').textContent = `${object.offer.price}₽/ночь`;
    card.querySelector('.popup__type').textContent = window.data.typesRus[object.offer.type].translate;
    card.querySelector('.popup__text--capacity').textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
    card.querySelector('.popup__text--time').textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__description').textContent = object.offer.description;
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__avatar').src = object.author.avatar;

    setFeatures(card, object);
    setPhotos(card, object);

    return card;
  };

  const setFeatures = (template, object) => {
    if (object.offer.features.length) {
      for (let j = 0; j < object.offer.features.length; j++) {
        const featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', `popup__feature--${object.offer.features[j]}`);
        template.querySelector('.popup__features').append(featureItem);
      }
    } else {
      template.querySelector('.popup__features').style = 'display: none';
    }
  };


  const setPhotos = (template, object) => {
    if (object.offer.photos.length) {
      for (let j = 0; j < object.offer.photos.length; j++) {
        let popupPhoto = document.createElement('img');
        popupPhoto.src = object.offer.photos[j];
        popupPhoto.classList.add('popup__photo');
        popupPhoto.width = 45;
        popupPhoto.height = 40;
        popupPhoto.alt = "Фотография жилья";
        template.querySelector('.popup__photos').append(popupPhoto);
      }
    } else {
      template.querySelector('.popup__photos').style = 'display: none';
    }
  };

  let popup;
  let popupClose;
  let pinsContainer = document.querySelector('.map__pins');

  //  открытие попапа
  const openPopup = (object) => {
    if (popup) {
      closePopup();
    }
    popup = pinsContainer.insertAdjacentElement('afterend', createCard(object));
    popupClose = popup.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    popupClose.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscPress);
  };

  //  закрытие попапа
  const closePopup = () => {
    popup.remove();
    popupClose.removeEventListener('click', closePopup);
    popupClose.removeEventListener('keydown', onPopupEnterPress);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  const onPopupEnterPress = (evt) => {
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
