const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/data.js`,
    `./js/card-create.js`,
    `./js/card-popup.js`,
    `./js/backend.js`,
    `./js/map.js`,
    `./js/pins.js`,
    `./js/debounce.js`,
    `./js/filters.js`,
    `./js/form.js`,
    `./js/form-validation.js`,
    `./js/pin-main.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
