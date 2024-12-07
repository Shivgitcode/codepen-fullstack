const bcrypt = require("bcrypt");
const { prisma } = require("../prismaClient");
const jwt = require("jsonwebtoken");
const { AppError } = require("../error/AppError");
const { transportMail } = require("../nodemailer/mail");
const { mailContent } = require("../nodemailer/mailContent");
require("dotenv").config();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    console.log(email, username, password);

    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log(findUser);
    if (findUser) {
      return next(new AppError(409, "User already exists"));
    }

    const hashPass = await bcrypt.hash(password, 12);

    const createuser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPass.toString(),
      },
    });

    const mailOptions = await mailContent(createuser);

    transportMail.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(info.messageId);
    });

    res.status(200).json({
      message: "user created",
      data: createuser,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!findUser) {
      return req.status(404).json({
        message: "user not found",
      });
    }

    const verifyPass = await bcrypt.compare(password, findUser.password);

    if (verifyPass) {
      const token = jwt.sign(findUser, process.env.JWT_SECRET);
      res.cookie("jwt", token, {
        maxAge: 2 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "successfully logged in ",
        token: findUser,
      });
    } else {
      res.status(403).json({
        message: "incorrect username or password",
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 **/

const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 1,
    });
    res.status(200).json({
      message: "logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 **/

const forgotPassword = async (req, res, next) => {
  try {
    const passbody = req.body;
    console.log("this is pass", passbody);
    if (!passbody.email) {
      return res.status(400).json({
        message: "email required",
      });
    }
    const findUser = await prisma.user.findUnique({
      where: {
        email: passbody.email,
      },
    });
    console.log("forgot", findUser);

    const token = await jwt.sign(
      { email: passbody.email },
      process.env.JWT_SECRET
    );
    await transportMail
      .sendMail({
        from: "shivneeraj2004@gmail.com",
        to: findUser.email,
        html: `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        /* General resets */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        table {
            border-spacing: 0;
            width: 100%;
        }
        td {
            padding: 10px;
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        /* Main container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }
        /* Header styles */
        .email-header {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        /* Body styles */
        .email-body {
            padding: 20px;
        }
        .email-body p {
            line-height: 1.6;
            color: #555555;
        }
        .email-body a {
            display: inline-block;
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .email-body a:hover {
            background-color: #0056b3;
        }
        /* Footer styles */
        .email-footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <table class="email-container">
        <!-- Header -->
        <tr>
            <td class="email-header">
                <h1>CodePen Password Reset</h1>
            </td>
        </tr>
        <!-- Body -->
        <tr>
            <td class="email-body">
                <p>Hello ${findUser.username},</p>
                <p>We received a request to reset your password for your CodePen account. Click the button below to reset your password:</p>
                <a href="http://localhost:5173/changepass?token=${token}" target="_blank">Reset Password</a>
                <p>If you didn’t request a password reset, you can safely ignore this email. Your password will remain the same.</p>
                <p>For further assistance, feel free to contact our support team.</p>
                <p>Thanks,<br>The CodePen Team</p>
            </td>
        </tr>
        <!-- Footer -->
        <tr>
            <td class="email-footer">
                <p>&copy; 2024 CodePen. All rights reserved.</p>
                <p><a href="https://codepen.io" target="_blank">Visit CodePen</a> | <a href="[Unsubscribe Link]" target="_blank">Unsubscribe</a></p>
            </td>
        </tr>
    </table>
</body>
</html>

            `,
      })
      .then((res) => {
        console.log(res.messageId);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json({
      message: "reset link sent",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 **/

const changePassword = async (req, res, next) => {
  const { token, password } = req.body;
  console.log(token, password);
  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode);
  const hashPass = await bcrypt.hash(password, 12);
  const updatePass = await prisma.user.update({
    where: {
      email: decode.email,
    },
    data: {
      password: hashPass,
    },
  });
  console.log(updatePass);
  res.status(200).json({
    message: "password updated",
  });
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 **/
const checkAuth = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "user found",
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  login,
  logout,
  forgotPassword,
  changePassword,
  checkAuth,
};
