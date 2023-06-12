const r_unit = require('./unitsRouter')
const r_auth = require('./authRouter')

module.exports = {
    routes: [
        r_unit,
        r_auth
    ]
}