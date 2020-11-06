'use strict';

const StatusCode = { // это ошибки, связанные с сервером
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  NOT_FOUND: 404
};
const TIMEOUT_IN_MS = 10000;

const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

const Method = {
  GET: `GET`,
  POST: `POST`
};

const request = (method, data, url, onLoad, onError) => {
  const xhr = new XMLHttpRequest(); // чтобы сделать запрос на сервер
  xhr.responseType = `json`; // сервер вернёт данные в указанном формате

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case StatusCode.OK:
        onLoad(xhr.response); // xhr.response - текст ответа от cервера
        break;
      case StatusCode.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case StatusCode.UN_AUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case StatusCode.NOT_FOUND:
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

const upload = (data, onLoad, onError) => {
  request(Method.POST, data, URL_UPLOAD, onLoad, onError);
};

const load = (onLoad, onError) => {
  request(Method.GET, null, URL_LOAD, onLoad, onError);
};

window.backend = {
  upload,
  load
};
