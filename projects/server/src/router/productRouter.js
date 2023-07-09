const router = require("express").Router();
const { uploadFile } = require("../middleware/multer");
// const authorize = require('../')
const { c_products } = require("../controllers");

router.post("/product/add", uploadFile, c_products.addProduct);
router.get("/product", c_products.getProduct);
router.get("/product/:id", c_products.getProductById);
router.delete("/product/delete/:id", c_products.deleteProduct);
router.patch("/product/:id", uploadFile, c_products.updateProduct);
router.post("/product/stock/:id", c_products.addProductStock)
router.get("/store/product", c_products.getStoreProduct);
router.get("/store/product/detail/:id", c_products.getStoreProductDetail);

module.exports = router;
