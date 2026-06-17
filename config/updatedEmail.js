const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PWD = process.env.PWD;

module.exports = (userEmail, firstName, id, origin) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    // SENDER EMAIL AND PASSWORD
    auth: {
      user: EMAIL,
      pass: PWD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    const info = await transporter.sendMail({
      from: `"TABAANI" <${EMAIL}>`, // sender address
      to: userEmail,
      subject: "Confirm your new email address", // Subject line
      html: `Hello <h2> ${firstName} </h2>
      You recently requested to update your email address on TABAANI. <br>
      Please visit this <a href="${origin}/verify-email/${id}" target="_blank" >link</a> to confirm and verify your new email. <br>
      If you did not request this change, please contact our support team immediately. <br>
      HAVE FUN!
      `, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};
