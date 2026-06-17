const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PWD = process.env.PWD;

module.exports = (userEmail, firstName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PWD,
    },
  });

  async function main() {
    await transporter.sendMail({
      from: `"TABAANI" <${EMAIL}>`,
      to: userEmail,
      subject: "Your password was changed",
      html: `Hello <h2>${firstName}</h2>
      This is a confirmation that your TABAANI account password was successfully changed. <br>
      If you did not make this change, please contact our support team immediately. <br>
      Stay safe!!
      `,
    });
  }

  main().catch(console.error);
};
