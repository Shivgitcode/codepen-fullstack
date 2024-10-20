const express = require("express")
const { createPen, getAllPens, deletePen, getOnePen, updateOnePen, savePen, getSavedPens } = require("../controllers/pen")
const { protectedRoute } = require("../middleware/middleware")

const router = express.Router()

router.post("/codepen", protectedRoute, createPen)
router.get("/codepen", protectedRoute, getAllPens)
router.delete("/codepen/:id", protectedRoute, deletePen)
router.post("/codepen/:id", protectedRoute, getOnePen)
router.patch("/codepen/:id", protectedRoute, updateOnePen)
router.post("/codepen/savepen/:penId", protectedRoute, savePen)
router.get("/codepen/savepen", protectedRoute, getSavedPens)

module.exports.penRouter = router

