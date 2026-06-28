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
      subject: "Please verify your account", // Subject line
      html: `Hello <h2>${firstName}</h2> and welcome to TABAANI! <br><br>
Thank you for registering as a Local Guide. <br>
Please start by verifying your email address by clicking the link below: <br>
<a href="${origin}/verify-email/${id}" target="_blank">Verify my email</a> <br><br>
<strong>Important:</strong> To complete your guide account activation, 
please send the following documents to <a href="mailto:${EMAIL}">support@tabaani.com</a>: <br><br>
<ul>
  <li>📄 Valid ID or Passport</li>
  <li>📄 Criminal Record Certificate</li>
  <li>📄 Proof of Experience</li>
  <li>📄 Official Tour Guide License</li>
</ul>
Your account will be fully activated once your documents are reviewed and approved. <br><br>
The TABAANI Team`, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};
