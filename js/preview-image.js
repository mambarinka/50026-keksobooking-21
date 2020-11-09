'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);

const photoFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = document.querySelector(`.ad-form__photo`);

let photoPreviewImage = document.createElement(`img`);
let defaultAvatar = avatarPreview.getAttribute(`src`);

photoPreviewImage.style.width = `70px`;
photoPreviewImage.style.height = `70px`;

const clearPhotoPreview = () => {
  const image = photoPreview.querySelector(`img`);
  if (image) {
    image.remove();
  }
};

const clearAvatarPreview = () => {
  if (avatarPreview) {
    avatarPreview.src = defaultAvatar;
  }
};

const loadPreview = (input, element, img) => {
  let file = input.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      if (input === photoFileChooser) {
        img.append(element);
      }
      element.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

let onAvatarFileChooserChange = () => {
  loadPreview(avatarFileChooser, avatarPreview);
};

let onPhotoFileChooserChange = () => {
  loadPreview(photoFileChooser, photoPreviewImage, photoPreview);
};

let activateLoadImg = () => {
  avatarFileChooser.addEventListener(`change`, onAvatarFileChooserChange);
  photoFileChooser.addEventListener(`change`, onPhotoFileChooserChange);
};

let disableLoadImg = () => {
  avatarFileChooser.removeEventListener(`change`, onAvatarFileChooserChange);
  photoFileChooser.removeEventListener(`change`, onPhotoFileChooserChange);
  clearPhotoPreview();
  clearAvatarPreview();
};

window.previewImage = {
  activateLoadImg,
  disableLoadImg
};
