const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;
const PWD = process.env.PWD;

module.exports = async (userEmail, firstName, id, origin) => {
  try {
    await resend.emails.send({
      from: `TABAANI <${EMAIL}>`,
      to: userEmail,
      subject: "Confirm your new email address",
      html: `Hello <h2> ${firstName} </h2>
      You recently requested to update your email address on TABAANI. <br>
      Please visit this <a href="${origin}/verify-email/${id}" target="_blank" >link</a> to confirm and verify your new email. <br>
      If you did not request this change, please contact our support team immediately. <br>
      HAVE FUN!
      `,
    });
  } catch (error) {
    console.log("Email sending failed:", error);
  }
};
