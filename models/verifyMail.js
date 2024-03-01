const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.API_USER,
    pass: process.env.API_PASS,
  },
});

const sendMail = (to, token) => {
  const from = "bartek.gal23@gmail.com";
  const subject = "Test Mail";
  const html = `<form action="http://localhost:3000/api/users/verify/${token}" method="get">
  <h2>Hello to my testing form</h2>
  <p>If you want to verified your mail, pleas click the button.</p>
  <button type="submit">Click and verified</button>
  <p>Enjoy.</p>
</form>`;

  return transporter.sendMail({ to, from, subject, html });
};

module.exports = { sendMail };
