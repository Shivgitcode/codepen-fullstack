const jwt = require("jsonwebtoken")
const { prisma } = require("../prismaClient")
require("dotenv").config()
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const createPen = async (req, res, next) => {
    try {
        const { html, css, js, title } = req.body
        const currUser = req.user
        console.log(currUser)
        const newPen = await prisma.pen.create({
            data: {
                title,
                html,
                css,
                js,
                userId: currUser.id
            }
        })

        res.status(201).json({
            message: "pen saved",
            data: newPen

        })
    } catch (error) {
        next(error)

    }

}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const getAllPens = async (req, res, next) => {
    try {
        const currUser = req.user
        console.log("hello", currUser)
        const allPens = await prisma.pen.findMany({
            include: {
                user: true
            },
            where: {
                userId: currUser.id

            }
        })

        res.status(200).json({
            message: "all pens",
            data: allPens
        })


    }
    catch (err) {
        next(err)

    }
}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const deletePen = async (req, res, next) => {
    try {
        const { id: penId } = req.params
        const deletedPen = await prisma.pen.delete({
            where: {
                id: penId

            }
        })
        res.status(200).json({
            message: "pen deleted",
            data: deletedPen
        })

    } catch (error) {
        next(error)

    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const getOnePen = async (req, res, next) => {
    try {
        const currUser = req.user
        const { id: penId } = req.params
        const findOnePen = await prisma.user.findFirst({
            where: {
                id: currUser.id


            },
            select: {
                pens: {
                    where: {
                        id: penId
                    }
                }
            }
        })

        res.status(200).json({
            message: "Hello",
            pen: findOnePen
        })

    }
    catch (error) {
        next(error)

    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const updateOnePen = async (req, res, next) => {
    try {
        const { id: penId } = req.params
        const { html, css, js, title } = req.body

        const updatedItem = await prisma.pen.update({
            where: {
                id: penId
            },
            data: {
                html,
                css,
                js,
                title

            }
        })
        res.status(200).json({
            message: "updated pen",
            data: updatedItem
        })

    } catch (error) {
        next(error)

    }

}


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const savePen = async (req, res, next) => {
    try {
        const { penId } = req.params
        const currUser = req.user
        const save = await prisma.savePen.create({
            data: {
                penId: penId,
                userId: currUser.id
            }

        })
        return res.status(200).json({
            message: "pen saved successfully",
            data: save
        })
    } catch (error) {
        next(error)

    }

}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const getSavedPens = async (req, res, next) => {
    try {
        const currUser = req.user
        const pendata = await prisma.savePen.findMany({
            include: {
                pen: {
                    include: {
                        user: true
                    }

                }

            },
            where: {
                userId: currUser.id
            }

        })
        return res.status(200).json({
            message: " all saved pens",
            data: pendata
        })

    } catch (error) {
        next(error)

    }
}




module.exports = {
    createPen,
    getAllPens,
    deletePen,
    getOnePen,
    updateOnePen,
    savePen,
    getSavedPens
}