const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;
// const PWD = process.env.PWD;

module.exports = async (userEmail, firstName, id, origin) => {
  try {
    await resend.emails.send({
      from: `TABAANI <${EMAIL}>`,
      to: userEmail,
      subject: "Please verify your account",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f0f4ff; font-family: Arial, sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4ff; padding: 40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(59,130,246,0.10);">

          <!-- Header -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%); padding: 48px 40px;">
              <h1 style="margin:0; color:#ffffff; font-size:32px; letter-spacing:3px; font-weight:800;">TABAANI</h1>
              <p style="margin:8px 0 0 0; color:#bfdbfe; font-size:14px; letter-spacing:1px;">Your Local Guide Platform</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 48px 40px 32px 40px;">
              <h2 style="margin:0 0 16px 0; color:#1d4ed8; font-size:24px;">Welcome, ${firstName}! 👋</h2>
              <p style="margin:0 0 16px 0; color:#374151; font-size:16px; line-height:1.6;">
                We are thrilled to have you on board. Your journey with TABAANI starts NOW!
              </p>
              <p style="margin:0 0 32px 0; color:#374151; font-size:16px; line-height:1.6;">
                Please verify your email address to activate your account and start exploring local guides around the world.
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${origin}/verify-email/${id}" target="_blank"
                      style="display:inline-block;
                             background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
                             color:#ffffff;
                             text-decoration:none;
                             padding:16px 48px;
                             border-radius:50px;
                             font-size:16px;
                             font-weight:700;
                             letter-spacing:1px;
                             box-shadow: 0 4px 16px rgba(59,130,246,0.4);">
                      ✉️ Verify My Account
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="margin:32px 0 0 0; color:#9ca3af; font-size:13px; text-align:center; line-height:1.6;">
                If the button does not work, copy and paste this link in your browser:<br>
                <a href="${origin}/verify-email/${id}" style="color:#3b82f6; word-break:break-all;">
                  ${origin}/verify-email/${id}
                </a>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 40px 40px; text-align:center;">
              <p style="margin:0 0 8px 0; color:#6b7280; font-size:13px;">
                If you did not create a TABAANI account, you can safely ignore this email.
              </p>
              <p style="margin:0; color:#9ca3af; font-size:12px;">
                © 2026 TABAANI · All rights reserved
              </p>
              <p style="margin:8px 0 0 0;">
                <a href="${origin}" style="color:#3b82f6; font-size:12px; text-decoration:none;">www.tabaani.nl</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`,
    });
  } catch (error) {
    console.log("Email sending failed:", error);
  }
};

// const axios = require("axios");

// module.exports = async (userEmail, firstName, id, origin) => {
//   try {
//     await axios.post(
//       "https://api.brevo.com/v3/smtp/email",
//       {
//         sender: { name: "TABAANI", email: process.env.SENDER_EMAIL },
//         to: [{ email: userEmail }],
//         subject: "Please verify your account",
//         htmlContent: `Hello <h2>${firstName}</h2> and welcome to TABAANI, your journey starts NOW!! <br>
//         Please visit this <a href="${origin}/verify-email/${id}" target="_blank">link</a> to verify your account. <br>
//         HAVE FUN!`,
//       },
//       {
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "Content-Type": "application/json",
//         },
//       },
//     );
//   } catch (error) {
//     console.log("Email sending failed:", error.response?.data || error.message);
//   }
// };
