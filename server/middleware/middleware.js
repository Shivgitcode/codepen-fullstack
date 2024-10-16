const jwt = require("jsonwebtoken")
require("dotenv").config()


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const protectedRoute = async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(404).json({
            message: "token not found try login again"
        })
    }
    const user = jwt.verify(token, process.env.JWT_SECRET)
    if (!token) {
        return res.status(403).json({
            message: "first login"
        })
    }
    req.user = user

    next()
}

module.exports = {
    protectedRoute
}