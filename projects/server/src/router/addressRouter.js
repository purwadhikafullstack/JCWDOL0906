const express = require("express");
const router = express.Router();

const { login } = require("../middleware/authorization");
const addressController = require("../controllers/addressController");

router.get("/", login, addressController.getAddress);
router.post("/", login, addressController.postAddress);
router.patch("/edit", login, addressController.updateAddress);
router.delete("/:id", login, addressController.deleteAddress);

module.exports = router;
