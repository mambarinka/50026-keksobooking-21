'use strict';

(() => {
  const FILTER_VALUE_DEFAULT = `any`;
  const MAX_NUMBER_PIN = 5;

  const filterForm = document.querySelector(`.map__filters`);
  const filterFieldset = filterForm.querySelector(`fieldset`);
  const filterSelect = filterForm.querySelectorAll(`select`);
  const filterHousingType = filterForm.querySelector(`#housing-type`);
  const filterPrice = filterForm.querySelector(`#housing-price`);
  const filterRoomNumber = filterForm.querySelector(`#housing-rooms`);
  const filterGuestCapacity = filterForm.querySelector(`#housing-guests`);
  const filterFeatures = filterForm.querySelector(`#housing-features`);

  const resetFilter = () => {
    filterHousingType.value = FILTER_VALUE_DEFAULT;
    filterPrice.value = FILTER_VALUE_DEFAULT;
    filterRoomNumber.value = FILTER_VALUE_DEFAULT;
    filterGuestCapacity.value = FILTER_VALUE_DEFAULT;
    filterFeatures.querySelectorAll(`input:checked`).forEach((input) => {
      input.checked = false;
    });
  };

  //  функция-обработчик по изменению фильтров
  const onFilterChange = function () {
    window.cardPopup.deletePopup();
    window.pins.hideMapPins();
    window.pins.onSuccessAddPins(getFilteredObjects(window.objects));
  };

  //  функция для деактивации полей фильтра
  const deactivateFilter = () => {
    resetFilter();
    window.util.addDisabledAttribute(filterForm, filterFieldset);
    window.util.addDisabledAttribute(filterForm, filterSelect);
    filterForm.removeEventListener(`change`, window.debounce(onFilterChange));
  };

  //  функция для активации полей фильтра
  const activateFilter = () => {
    window.util.removeDisabledAttribute(filterFieldset);
    window.util.removeDisabledAttribute(filterSelect);
    filterForm.addEventListener(`change`, window.debounce(onFilterChange));
  };

  //  фильтрация объявлений
  const getFilteredObjects = (objects) => {
    let filteredObjects = [];
    for (let i = 0; i < objects.length; i++) {
      if (checkfilterItem(filterHousingType, objects[i].offer, `type`) &&
        checkfilterItem(filterRoomNumber, objects[i].offer, `rooms`) &&
        checkfilterItem(filterGuestCapacity, objects[i].offer, `guests`) &&
        checkPrice(objects[i]) &&
        checkFeatures(objects[i])) {
        filteredObjects.push(objects[i]);
      }
      if (filteredObjects.length === MAX_NUMBER_PIN) {
        break;
      }
    }
    return filteredObjects;
  };

  // Функция выбора фильтров (типа жилья, комнат, гостей)
  const checkfilterItem = function (it, item, key) {
    return it.value === FILTER_VALUE_DEFAULT ? true : it.value === item[key].toString();
  };

  // Выбор диапазона цены
  const checkPrice = function (ad) {
    const priceRange = window.data.valuesFilterPrice[filterPrice.value];
    return filterPrice.value === FILTER_VALUE_DEFAULT ? true : ad.offer.price > priceRange.min && ad.offer.price <= priceRange.max;
  };

  // Выбор удобств
  const checkFeatures = function (ad) {
    const checkedFeaturesItems = filterFeatures.querySelectorAll(`input:checked`);
    return Array.from(checkedFeaturesItems).every(function (element) {
      return ad.offer.features.includes(element.value);
    });
  };

  window.filters = {
    deactivateFilter,
    activateFilter
  };
})();
