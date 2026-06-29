const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;
const PWD = process.env.PWD;

module.exports = async (userEmail, firstName, id, origin) => {
  try {
    await resend.emails.send({
      from: `TABAANI <${EMAIL}>`,
      to: userEmail,
      subject: "Please verify your account",
      html: `Hello <h2> ${firstName} </h2> and welcome to TABAANI, your journey starts NOW!! <br>
      Please visit this <a href="${origin}/verify-email/${id}" target="_blank" >link</a> to verify your account. <br>
      HAVE FUN!
      `,
    });
  } catch (error) {
    console.log("Email sending failed:", error);
  }
};
