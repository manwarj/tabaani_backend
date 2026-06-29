const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;
const PWD = process.env.PWD;

module.exports = async (userEmail, firstName, id, origin) => {
  try {
    await resend.emails.send({
      from: `TABAANI <${EMAIL}>`,
      to: userEmail,
      subject: "How was your experience?",
      html: `
      <p>Hello <strong>${touristName}</strong>,</p>
      <p>We hope you had an amazing trip with <strong>${guideName}</strong>! 🌍</p>
      <p>We would love to hear about your experience. Please click the link below to leave a review:</p>
      <a href="${origin}/review/${bookingId}" target="_blank">Leave a Review</a>
      <p>Your feedback helps other tourists find the best guides on TABAANI.</p>
      <p>The TABAANI Team</p>
      `,
    });
  } catch (error) {
    console.log("Email sending failed:", error);
  }
};
