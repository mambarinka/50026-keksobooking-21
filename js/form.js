'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const resetButton = document.querySelector(`.ad-form__reset`);

  resetButton.addEventListener(`click`, () => {
    window.main.deactivatePage();
  });

  //  функция добавляет атрибут disabled всем полям
  const addDisabledAttribute = (fields) => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].setAttribute(`disabled`, `disabled`);
    }
  };

  //  функция удаляет атрибут disabled всем полям
  const removeDisabledAttribute = (fields) => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].removeAttribute(`disabled`);
    }
  };

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
    window.backend.save(new FormData(adForm), () => {
      addFormMessage(messageSuccess);
      window.main.deactivatePage();
    }, () => {
      addFormMessage(messageError);
    });
  //  evt.preventDefault();
  };

  adForm.addEventListener(`submit`, onSubmitSendForm);

  window.form = {
    addDisabledAttribute,
    removeDisabledAttribute,
    adForm
  };
})();
