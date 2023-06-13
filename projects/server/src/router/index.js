const r_unit = require('./unitsRouter')
const r_auth = require('./authRouter')
const r_product = require('./productRouter')

module.exports = {
    routes: [
        r_unit,
        r_auth,
        r_product
    ]
}