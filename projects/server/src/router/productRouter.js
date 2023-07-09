const router = require("express").Router();
const { uploadFile } = require("../middleware/multer");
const { c_products } = require("../controllers");

router.post("/product", uploadFile, c_products.addProduct);
router.get("/product", c_products.getProduct);
router.get("/product/:id", c_products.getProductById);
router.delete("/product/delete/:id", c_products.deleteProduct);
router.patch("/product/:id", c_products.updateProduct);
router.post("/product/:id/stock", c_products.addProductStock)
router.get("/store/product", c_products.getStoreProduct);

module.exports = router;
