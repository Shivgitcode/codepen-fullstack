const express = require("express")
const { signUp, login, logout, forgotPassword, changePassword } = require("../controllers/user")
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.post("/resetpassword",forgotPassword)
router.post("/changepassword",changePassword)


module.exports.userRouter = router