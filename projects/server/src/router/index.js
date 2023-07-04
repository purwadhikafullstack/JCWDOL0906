const r_auth = require('./authRouter')
const r_category = require('./categoryRouter')

module.exports = {
    routes: [
        r_auth,
        r_category
    ]
}