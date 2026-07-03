const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;

module.exports = async (userEmail, firstName, id, origin, resetToken) => {
  try {
    await resend.emails.send({
      from: `TABAANI <${EMAIL}>`,
      to: userEmail,
      subject: "Restore your Password",
      html: `<p>Hello <strong>${firstName}</strong>,</p>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${origin}/reset-pwd/${resetToken}" target="_blank" >Reset Password</a>
      <p>This link expires in 15 minutes.</p>
      <p>If you did not request this, ignore this email.</p>
      `,
    });
  } catch (error) {
    console.log("Email sending failed:", error);
  }
};
