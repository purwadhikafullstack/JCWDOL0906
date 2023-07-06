const router = require("express").Router();
const { productControllers } = require("../controllers/productControllers");
const { uploadFile } = require("../middleware/multer");
// const authorize = require('../')
const { c_products } = require("../controllers");

router.post("/product/add", uploadFile, productControllers.addProduct);
router.get("/product", productControllers.getProduct);
router.delete("/product/delete/:id", productControllers.deleteProduct);
router.patch("/product/:id", uploadFile, productControllers.updateProduct);
router.get("/store/product", c_products.getStoreProduct);
router.get("/store/product/detail/:id", c_products.getStoreProductDetail);

module.exports = router;
