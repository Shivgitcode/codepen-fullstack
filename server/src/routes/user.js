const express = require("express");
const {
  signUp,
  login,
  logout,
  forgotPassword,
  changePassword,
  checkAuth,
} = require("../controllers/user");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resetpassword", forgotPassword);
router.post("/changepassword", changePassword);
router.get("/check/me", checkAuth);

module.exports.userRouter = router;
