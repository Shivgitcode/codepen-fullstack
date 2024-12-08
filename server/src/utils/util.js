const speakeasy = require("speakeasy");

const generateOtp = () => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    step: 30,
  });
  return { secret: secret.base32, token };
};

const verifyOtp = (otp, secret) => {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token: otp,
    window: 1,
  });
};

module.exports = {
  generateOtp,
  verifyOtp,
};
