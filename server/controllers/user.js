const bcrypt = require("bcrypt")
const { prisma } = require("../prismaClient")
const express = require("express")
const jwt = require("jsonwebtoken")

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signUp = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        // console.log(username, password, email)

        const hashPass = await bcrypt.hash(password, 12)


        const createuser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPass.toString()
            }

        })

        res.status(200).json({
            message: "user created",
            data: createuser
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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const findUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!findUser) {
            return req.status(404).json({
                message: "user not found"
            })
        }

        const verifyPass = await bcrypt.compare(password, findUser.password)

        if (verifyPass) {
            const token = jwt.sign()
        }




    }
    catch (err) {

    }
}


module.exports = {
    signUp
}