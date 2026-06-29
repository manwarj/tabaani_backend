const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;
const PWD = process.env.PWD;

module.exports = async (userEmail, firstName, id, origin) => {
  try {
    await resend.emails.send({
      from: `TABAANI <${EMAIL}>`,
      to: userEmail,
      subject: "Your password was changed",
      html: `Hello <h2>${firstName}</h2>
      This is a confirmation that your TABAANI account password was successfully changed. <br>
      If you did not make this change, please contact our support team immediately. <br>
      Stay safe!!
      `,
    });
  } catch (error) {
    console.log("Email sending failed:", error);
  }
};
