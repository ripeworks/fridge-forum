const withFridge = require("fridge-next/config");

module.exports = withFridge({
  fridge: {
    token: process.env.FRIDGE_TOKEN,
  },
});
