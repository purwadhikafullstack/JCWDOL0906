const r_unit = require('./unitsRouter')
const r_auth = require('./authRouter')
const r_temp_category = require('./tempCategoryRouter')
const r_product = require('./productRouter')
const r_cart = require('./cartRouter')
// const r_category = require('./categoryRouter')

module.exports = {
    routes: [
        r_unit,
        r_auth,
        r_product,
        r_temp_category,
        r_cart
    ]
}