'use strict';

(() => {
  const StatusCode = { // это ошибки, связанные с сервером
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404
  };
  const TIMEOUT_IN_MS = 10000;

  const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const Method = {
    GET: `GET`,
    POST: `POST`
  };

  const request = function (method, data, url, onLoad, onError) {
    const xhr = new XMLHttpRequest(); // чтобы сделать запрос на сервер
    xhr.responseType = `json`; // сервер вернёт данные в указанном формате

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response); // xhr.response - текст ответа от cервера
          break;
        case StatusCode.BadRequest:
          error = `Неверный запрос`;
          break;
        case StatusCode.Unauthorized:
          error = `Пользователь не авторизован`;
          break;
        case StatusCode.NotFound:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => { // ошибка со стороны клиента (отключенный интернет)
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => { // ошибка со стороны клиента (долгий ответ)
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url); // открыть соединение с помощью метода и адреса откуда получить данные
    xhr.send(data); // чтобы отправить запрос
  };

  const upload = function (data, onLoad, onError) {
    request(Method.POST, data, URL_SAVE, onLoad, onError);
  };

  const load = (onLoad, onError) => {
    request(Method.GET, null, URL_LOAD, onLoad, onError);
  };

  window.backend = {
    upload,
    load
  };
})();
