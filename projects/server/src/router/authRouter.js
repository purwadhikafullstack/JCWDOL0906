const router = require("express").Router();
const authControllers  = require("../controllers/authControllers.js");
// const { login } = require("../middleware/authorize");

router.post("/register", authControllers.register);
// router.post("/login", authControllers.login);
// router.post("/verification", login, authControllers.verification);
// router.post("/changepassword",  authControllers.changePassword);

module.exports = router;
