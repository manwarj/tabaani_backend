const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;

module.exports = async (userEmail, firstName, id, origin) => {
  try {
    await resend.emails.send({
      from: `TABAANI <${EMAIL}>`,
      to: userEmail,
      subject: "Please verify your account",
      html: `Hello <h2>${firstName}</h2> and welcome to TABAANI! <br><br>
Thank you for registering as a Local Guide. <br>
Please start by verifying your email address by clicking the link below: <br>
<a href="${origin}/verify-email/${id}" target="_blank">Verify my email</a> <br><br>
<strong>Important:</strong> To complete your guide account activation, 
please send the following documents to <a href="mailto:${EMAIL}">${EMAIL}</a>: <br><br>
<ul>
  <li>📄 Valid ID or Passport</li>
  <li>📄 Criminal Record Certificate</li>
  <li>📄 Proof of Experience</li>
  <li>📄 Official Tour Guide License</li>
</ul>
Your account will be fully activated once your documents are reviewed and approved. <br><br>
The TABAANI Team`,
    });
  } catch (error) {
    console.log("Email sending failed:", error);
  }
};
