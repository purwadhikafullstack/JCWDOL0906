const express = require("express");
const router = express.Router();

const { login } = require("../middleware/authorization");
const addressController = require("../controllers/addressController");

router.get("/", login, addressController.getAddress);
router.post("/add", login, addressController.postAddress);
router.patch("/edit", login, addressController.updateAddress);

module.exports = router;
