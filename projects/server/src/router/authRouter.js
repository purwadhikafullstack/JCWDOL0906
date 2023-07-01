const router = require("express").Router();
const authController = require("../controllers/authController");
const { login } = require("../middleware/authorization.js");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verification", login, authController.verification);
// router.post("/changepassword",  authControllers.changePassword);
router.patch("/:id", authController.editProfile);
// verified token untuk request edit (tambahin middleware verified token)
// params id, id dari token middleware
router.patch(
  "/profpic/:id",
  fileUploader({
    destinationFolder: "profile_pict",
    fileType: "image",
    prefix: "PP",
  }).single("image"),
  authController.editProfilePic
);

module.exports = router;
