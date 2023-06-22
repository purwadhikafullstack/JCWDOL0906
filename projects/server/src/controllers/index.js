const c_units = require('./unitsController.js')
const c_products = require('./productController')
const c_auth = require('./authController.js')
const c_category = require('./tempCategoryControllers')
module.exports = {
    c_units,
    c_products,
    c_auth,
    c_category
}