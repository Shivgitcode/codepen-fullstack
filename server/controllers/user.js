const bcrypt = require("bcrypt")
const { prisma } = require("../prismaClient")
const jwt = require("jsonwebtoken")
const { AppError } = require("../error/AppError")
const { transportMail } = require("../nodemailer/mail")
const { mailContent } = require("../nodemailer/mailContent")
require("dotenv").config()

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signUp = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        console.log(email, username, password)

        const findUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        console.log(findUser)
        if (findUser) {
            return next(new AppError(409, "User already exists"))
        }

        const hashPass = await bcrypt.hash(password, 12)


        const createuser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPass.toString()
            }

        })

        const mailOptions = await mailContent(createuser)



        transportMail.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
            console.log(info.messageId)
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
            const token = jwt.sign(findUser, process.env.JWT_SECRET)
            res.cookie("jwt", token, {
                maxAge: 2 * 60 * 60 * 1000
            })
            res.status(200).json({
                message: "successfully logged in ",
                token: token
            })
        }
        else {
            res.status(403).json({
                message: "incorrect username or password"
            })
        }


    }
    catch (err) {
        next(err)

    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
**/

const logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 1
        })
        res.status(200).json({
            message: "logged out successfully"
        })

    }
    catch (err) {
        next(err)

    }


}


module.exports = {
    signUp,
    login,
    logout
}