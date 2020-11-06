'use strict';

//  шаблон карточки объекта
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

//  функция создания DOM-элемента на основе шаблона карточки объекта
const createCard = (object) => {
  let card = cardTemplate.cloneNode(true);
  card.querySelector(`.popup__title`).textContent = object.offer.title;
  card.querySelector(`.popup__text--address`).textContent = object.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${object.offer.price}₽/ночь`;
  card.querySelector(`.popup__type`).textContent = window.data.typesRus[object.offer.type].translate;
  card.querySelector(`.popup__text--capacity`).textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  card.querySelector(`.popup__features`).innerHTML = ``;
  card.querySelector(`.popup__description`).textContent = object.offer.description;
  card.querySelector(`.popup__photos`).innerHTML = ``;
  card.querySelector(`.popup__avatar`).src = object.author.avatar;

  getFeatures(card, object);
  getPhotos(card, object);

  return card;
};

const getFeatures = (template, object) => {
  if (object.offer.features.length) {
    for (let i = 0; i < object.offer.features.length; i++) {
      const featureItem = document.createElement(`li`);
      featureItem.classList.add(`popup__feature`, `popup__feature--${object.offer.features[i]}`);
      template.querySelector(`.popup__features`).append(featureItem);
    }
  } else {
    template.querySelector(`.popup__features`).style = `display: none`;
  }
};

const getPhotos = (template, object) => {
  if (object.offer.photos.length) {
    for (let i = 0; i < object.offer.photos.length; i++) {
      let popupPhoto = document.createElement(`img`);
      popupPhoto.src = object.offer.photos[i];
      popupPhoto.classList.add(`popup__photo`);
      popupPhoto.width = 45;
      popupPhoto.height = 40;
      popupPhoto.alt = `Фотография жилья`;
      template.querySelector(`.popup__photos`).append(popupPhoto);
    }
  } else {
    template.querySelector(`.popup__photos`).style = `display: none`;
  }
};

window.cardCreate = {
  render: createCard
};
