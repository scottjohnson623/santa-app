import nodemailer from "nodemailer";

export default nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ETHERAL_USERNAME,
    pass: process.env.EMAIL_ETHEREAL_PASSWORD,
  },
});
