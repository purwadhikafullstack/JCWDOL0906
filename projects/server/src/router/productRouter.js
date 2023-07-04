const router = require("express").Router();
const product = require("../models/product");
const { uploadFile } = require("../middleware/productMulter");
// const authorize = require('../')
const { c_products } = require("../controllers");

router.post("/product/add", uploadFile, c_products.addProduct);
router.get("/product", c_products.getProduct);
router.delete("/product/delete/:id", c_products.deleteProduct);
router.patch("/product/:id", c_products.updateProduct);
// router.get("/store/product", c_products.getStoreProduct);
// router.get("/store/product/detail/:id", c_products.getStoreProductDetail);

module.exports = router;
