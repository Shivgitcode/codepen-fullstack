const nodemailer = require("nodemailer")

const transportMail = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shivneeraj2004@gmail.com",
        pass: "imqqjobtzszelvkp"
    }
})

module.exports = {
    transportMail
}