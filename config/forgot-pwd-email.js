const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PWD = process.env.PWD;

module.exports = (userEmail, firstName, id, resetToken, origin) => {
  
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
      subject: "Restore your Password", // Subject line
      html: `<p>Hello <strong>${firstName}</strong>,</p>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${origin}/reset-pwd/${resetToken}" target="_blank" >Reset Password</a>
      <p>This link expires in 15 minutes.</p>
      <p>If you did not request this, ignore this email.</p>
      `,
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};
