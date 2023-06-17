const router = require("express").Router();
const { productControllers } = require("../controllers");
const product = require("../models/product");
// const authorize = require('../')

router.post("/product/add", productControllers.addProduct);
router.post("/product/:id", productControllers.updateDetailProduct);
router.post("product/delete", productControllers.deleteProduct);
router.get("/product", productControllers.getProduct);
router.get("/product/detail", productControllers.getProductDetailByProductId);

module.exports = router;
