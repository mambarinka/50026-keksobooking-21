'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const resetButton = document.querySelector(`.ad-form__reset`);

  //  функция для деактивации формы
  const deactivateAdForm = () => {
    adForm.classList.add(`ad-form--disabled`);
    adForm.reset();
    window.formValidation.priceReset();
    window.util.addDisabledAttribute(adForm, adFormFieldsets);
    window.pinMain.setAddress(window.pinMain.coordsDefault);
    adForm.removeEventListener(`submit`, onSubmitSendForm);
  };

  //  функция для активации формы
  const activateAdForm = () => {
    adForm.classList.remove(`ad-form--disabled`);
    window.util.removeDisabledAttribute(adFormFieldsets);
    window.pinMain.setAddress(window.pinMain.coordsCustom);
    adForm.addEventListener(`submit`, onSubmitSendForm);
  };

  resetButton.addEventListener(`click`, () => {
    window.main.deactivatePage();
  });

  //  сообщения об успехе/ошибке отправки формы
  const messageSuccessTmpl = document.querySelector(`#success`).content.querySelector(`.success`);
  const messageSuccess = messageSuccessTmpl.cloneNode(true);
  const messageErrorTmpl = document.querySelector(`#error`).content.querySelector(`.error`);
  const messageError = messageErrorTmpl.cloneNode(true);

  const addFormMessage = (message) => {
    document.body.appendChild(message);
    document.addEventListener(`click`, onDocumentClick);
    document.addEventListener(`keydown`, onDocumentEscape);
  };

  const removeFormMessage = () => {
    messageSuccess.remove();
    messageError.remove();
    document.removeEventListener(`click`, onDocumentClick);
    document.removeEventListener(`keydown`, onDocumentEscape);
  };

  // Обработчик удаления сообщений по клику на документ
  const onDocumentClick = (evt) => {
    evt.preventDefault();
    if (evt.button === 0) {
      removeFormMessage();
    }
  };

  // Обработчик удаления сообщений по клику на Escape
  const onDocumentEscape = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      removeFormMessage();
    }
  };

  const onSubmitSendForm = (evt) => {
    window.backend.upload(new FormData(adForm), () => {
      addFormMessage(messageSuccess);
      window.main.deactivatePage();
    }, () => {
      addFormMessage(messageError);
    });
    evt.preventDefault();
  };

  window.form = {
    deactivateAdForm,
    activateAdForm,
    adForm
  };
})();
