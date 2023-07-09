const c_units = require('./unitsController.js')
const c_products = require('./productControllers')
const c_auth = require('./authController.js')
const c_cart = require('./cartControllers')
const c_category = require("./categoryController.js");

module.exports = {
  c_units,
  c_products,
  c_auth,
  c_category,
  c_cart
}
