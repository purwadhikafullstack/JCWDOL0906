const router = require("express").Router();
const { productControllers } = require("../controllers");
const product = require("../models/product");
const { uploadFile } = require("../middleware/productMulter");
// const authorize = require('../')

router.post("/product/add", uploadFile, productControllers.addProduct);
router.get("/product", productControllers.getProduct);
router.delete("/product/delete/:id", productControllers.deleteProduct);
router.patch("/product/:id", productControllers.updateProduct);

module.exports = router;
