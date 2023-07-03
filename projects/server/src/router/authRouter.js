const router = require("express").Router();
const authController = require("../controllers/authController");
const { login } = require("../middleware/authorization.js");
const { uploadProfileUser } = require("../helpers/multer");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verification", login, authController.verification);
// router.post("/changepassword",  authControllers.changePassword);
router.patch(
  "/profile/edit",
  login,
  uploadProfileUser.single("picture"),
  authController.editProfile
);
// verified token untuk request edit (tambahin middleware verified token)
// params id, id dari token middleware

module.exports = router;
