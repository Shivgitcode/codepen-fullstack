const express = require("express");
const {
  signUp,
  login,
  logout,
  forgotPassword,
  changePassword,
  checkAuth,
  otpVerification,
} = require("../controllers/user");
const { protectedRoute } = require("../middleware/middleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/verify-otp", otpVerification);
router.post("/logout", logout);
router.post("/resetpassword", forgotPassword);
router.post("/changepassword", changePassword);
router.get("/check/me", protectedRoute, checkAuth);

module.exports.userRouter = router;
