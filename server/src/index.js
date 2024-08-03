const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const dotenv = require("dotenv")
const { router } = require("../routes")

dotenv.config()
const port = process.env.PORT || 3000

app.use(express.json())

app.use("/api/v1", router)

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


