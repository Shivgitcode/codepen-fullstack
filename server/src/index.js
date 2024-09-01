const express = require("express")
const http = require("http")
const app = express()
const dotenv = require("dotenv")
const { userRouter } = require("../routes/user")
const { penRouter } = require("../routes/pens")
const cookieParser = require("cookie-parser")
const cors = require("cors")

dotenv.config()
const port = process.env.PORT || 5000

app.use(cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    origin: "http://localhost:5173"
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/v1", userRouter, penRouter)



app.use((err, req, res, next) => {
    const { message = "internal server error", status = 500 } = err
    res.status(status).json({
        message: message,

    })
    next(err)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


