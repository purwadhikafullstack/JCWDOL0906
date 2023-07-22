const express = require("express");
const router = express.Router();

const { login } = require("../middleware/authorization");
const rajaOngkirController = require("../controllers/rajaOngkirController");

router.post("/", login, rajaOngkirController.postOngkir);

module.exports = router;
