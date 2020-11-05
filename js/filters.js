'use strict';

(() => {
  const FILTER_VALUE_DEFAULT = `any`;
  const MAX_NUMBER_PIN = 5;

  const filterForm = document.querySelector(`.map__filters`);
  const filterInputs = filterForm.querySelectorAll(`input`);
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
  const onFilterChange = () => {
    window.cardPopup.deletePopup();
    window.pins.hideMapPins();
    window.pins.addPins(getFilteredObjects(window.objects));
  };

  //  функция для деактивации полей фильтра
  const deactivateFilter = () => {
    resetFilter();
    window.util.addDisabledAttribute(filterForm, filterInputs);
    window.util.addDisabledAttribute(filterForm, filterSelect);
    filterForm.removeEventListener(`change`, window.debounce(onFilterChange));
  };

  //  функция для активации полей фильтра
  const activateFilter = () => {
    window.util.removeDisabledAttribute(filterInputs);
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

  // функция выбора фильтров (типа жилья, комнат, гостей)
  const checkfilterItem = (filter, object, key) => {
    return filter.value === FILTER_VALUE_DEFAULT ? true : filter.value === object[key].toString();
  };

  // функция по выбору диапазона цены
  const checkPrice = (object) => {
    const priceRange = window.data.valuesFilterPrice[filterPrice.value];
    return filterPrice.value === FILTER_VALUE_DEFAULT ? true : object.offer.price > priceRange.min && object.offer.price <= priceRange.max;
  };

  // функция по выбору удобств
  const checkFeatures = (object) => {
    const checkedFeaturesItems = filterFeatures.querySelectorAll(`input:checked`);
    return Array.from(checkedFeaturesItems).every((element) => {
      return object.offer.features.includes(element.value);
    });
  };

  window.filters = {
    MAX_NUMBER_PIN,
    deactivateFilter,
    activateFilter
  };
})();
