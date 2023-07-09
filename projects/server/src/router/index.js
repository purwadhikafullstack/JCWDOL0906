const r_unit = require("./unitsRouter");
const r_auth = require('./authRouter');
const r_product = require("./productRouter");
const r_category = require('./categoryRouter')

module.exports = {
  routes: [r_unit, r_auth, r_category, r_product],
};
