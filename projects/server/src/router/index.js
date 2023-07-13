const r_unit = require('./unitsRouter');
const r_auth = require('./authRouter');
const r_product = require('./productRouter');
const r_category = require('./categoryRouter')
const r_cart = require('./cartRouter');
const r_prescription = require('./prescriptionRouter');

module.exports = {
  routes: [
    r_unit,
    r_auth,
    r_product,
    r_cart,
    r_category,
    r_prescription
  ]
}