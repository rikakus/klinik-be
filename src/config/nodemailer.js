const nodemailer = require("nodemailer");

let testAccount = nodemailer.createTestAccount();

const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  //   auth: {
  //     user: testAccount.user,
  //     pass: testAccount.pass,
  //   },
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
});

module.exports = mailer;
