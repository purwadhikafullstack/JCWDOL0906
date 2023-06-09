const router = require("express").Router();
const authControllers  = require("../controllers/authControllers.js");
const { login } = require("../middleware/authorization.js");

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/verification", login, authControllers.verification);
// router.post("/changepassword",  authControllers.changePassword);

module.exports = router;
