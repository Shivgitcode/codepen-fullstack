const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const protectedRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("hello", token);
  if (!token) {
    return res.status(403).json({
      message: "token not found try login again",
    });
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;

  next();
};

module.exports = {
  protectedRoute,
};
