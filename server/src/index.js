const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const dotenv = require("dotenv")
const { userRouter } = require("../routes/user")
const { penRouter } = require("../routes/pens")
const cookieParser = require("cookie-parser")

dotenv.config()
const port = process.env.PORT || 3000

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


