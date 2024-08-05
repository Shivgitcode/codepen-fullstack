const express = require("express")
const { createPen } = require("../controllers/pen")
const { protectedRoute } = require("../middleware/middleware")

const router = express.Router()

router.post("/codepen", protectedRoute, createPen)

module.exports.penRouter = router

