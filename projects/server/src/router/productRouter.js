const router = require("express").Router();
const { uploadFile } = require("../middleware/multer");
// const authorize = require('../')
const { c_products } = require("../controllers");

router.post("/product/add", uploadFile, c_products.addProduct);
router.get("/product", c_products.getProduct);
router.delete("/product/delete/:id", c_products.deleteProduct);
router.patch("/product/:id", uploadFile, c_products.updateProduct);


module.exports = router;
