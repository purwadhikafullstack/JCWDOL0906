const { c_cart } = require("../controllers");
const { login } = require("../middleware/authorization.js");
const router = require("express").Router();

router.get("/cart", login, c_cart.getAll);
router.post("/cart", login, c_cart.addToCart);
router.patch("/cart/:id", login, c_cart.updateCart);
router.delete("/cart/:id", login, c_cart.deleteCart);

module.exports = router;
