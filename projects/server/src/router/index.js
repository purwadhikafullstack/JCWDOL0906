const r_unit = require("./unitsRouter");
const r_auth = require("./authRouter");
const r_product = require("./productRouter");
const r_category = require("./categoryRouter");
const r_cart = require("./cartRouter");
const r_address = require("./addressRouter");
const r_ongkir = require("./rajaOngkirRouter");
// const r_transaction = require("./transactionRouter");

module.exports = {
  routes: [
    r_unit,
    r_auth,
    r_product,
    r_cart,
    r_category,
    r_address,
    r_ongkir,
    // r_transaction,
  ],
};
