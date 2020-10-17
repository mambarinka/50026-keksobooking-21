'use strict';

(() => {
  //  шаблон карточки объекта
  let cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  //  функция создания DOM-элемента на основе шаблона карточки объекта
  let createCard = (template, obj) => {
    let card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = obj.offer.title;
    card.querySelector('.popup__text--address').textContent = obj.offer.address;
    card.querySelector('.popup__text--price').textContent = `${obj.offer.price}₽/ночь`;
    card.querySelector('.popup__type').textContent = window.main.typesRus[obj.offer.type].translate;
    card.querySelector('.popup__text--capacity').textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
    card.querySelector('.popup__text--time').textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__description').textContent = obj.offer.description;
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__avatar').src = obj.author.avatar;

    let popupFeatures = card.querySelector('.popup__features');

    for (let j = 0; j < obj.offer.features.length; j++) {
      if (obj.offer.features.length) {
        let featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', `popup__feature--${obj.offer.features[j]}`);
        popupFeatures.append(featureItem);
      } else {
        popupFeatures.style = 'display: none';
      }
    }

    let popupPhotos = card.querySelector('.popup__photos');

    for (let j = 0; j < obj.offer.photos.length; j++) {
      if (obj.offer.photos.length) {
        let popupPhoto = document.createElement('img');
        popupPhoto.src = obj.offer.photos[j];
        popupPhoto.classList.add('popup__photo');
        popupPhoto.width = 45;
        popupPhoto.height = 40;
        popupPhoto.alt = "Фотография жилья";
        popupPhotos.append(popupPhoto);
      } else {
        popupPhotos.style = 'display: none';
      }
    }

    return card;
  };

  let createArray = window.main.createArrayObjects();

  window.card = {
    createCard: createCard,
    cardTemplate: cardTemplate,
    createArray: createArray
  };
})();
