const router = require("express").Router();
const authController = require("../controllers/authController");
const { login } = require("../middleware/authorization.js");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verification", login, authController.verification);
// router.post("/changepassword",  authControllers.changePassword);


module.exports = router;
