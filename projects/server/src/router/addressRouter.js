const express = require("express");
const router = express.Router();

const { login } = require("../middleware/authorization");
const { c_address } = require("../controllers");

router.get("/address", login, c_address.getAddress);
router.post("/address", login, c_address.postAddress);
router.patch("/address", login, c_address.updateAddress);
router.delete("/address/:id", login, c_address.deleteAddress);

module.exports = router;
