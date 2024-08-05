const express = require("express")
const { signUp, login } = require("../controllers/user")
const { createPen } = require("../controllers/pen")
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)


module.exports.userRouter = router