'use strict';

(() => {

  //  функция создания всех карточек объявлений
  const getRandomCards = () => {
    const randomCards = window.util.createArrayObjects(window.constants.OBJECTS_AMOUNT, window.mock.getRandomObjects);
    return randomCards;
  };

  const cards = getRandomCards();

  //  функция показа всех пинов, включая их карточки, по нажатию
  const showMapPins = () => {
    const fragmentWithObjects = window.pin.makeFragment(cards);
    window.card.pinsContainer.appendChild(fragmentWithObjects);
  };

  //  функция скрытия всех пинов
  const hideMapPins = () => {
    const notMainPins = window.card.pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    notMainPins.forEach((pin) => {
      pin.remove();
    });
  };

  window.map = {
    getRandomCards,
    cards,
    showMapPins,
    hideMapPins
  };
})();
