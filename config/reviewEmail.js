const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PWD = process.env.PWD;

module.exports = (touristEmail, touristName, guideName, bookingId, origin) => {
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
      to: touristEmail,
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
  }

  main().catch(console.error);
};
