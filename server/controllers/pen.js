const jwt = require("jsonwebtoken")
const { prisma } = require("../prismaClient")
require("dotenv").config()
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const createPen = async (req, res) => {
    try {
        const { html, css, js } = req.body
        const token = req.cookies.jwt
        const currUser = jwt.verify(token, process.env.JWT_SECRET)
        const newPen = await prisma.pen.create({
            data: {
                html,
                css,
                js
            }
        })
        if (newPen) {
            await prisma.user.update({
                where: {
                    id: currUser.id
                },
                data: {
                    pens: {
                        connect: {
                            userId: newPen.id
                        }
                    }
                }
            })
        }
        res.status(201).json({
            message: "pen saved",
            data: newPen

        })
    } catch (error) {
        next(error)

    }

}

module.exports = {
    createPen
}