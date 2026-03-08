const nodemailer = require("nodemailer");
const { config } = require("dotenv");
config();

const transportMail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

module.exports = {
  transportMail,
};
