const jwt = require("jsonwebtoken")
require("dotenv").config()


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const protectedRoute = async (req, res) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(403).json({
            message: "first login"
        })
    }
}

module.exports = {
    protectedRoute
}