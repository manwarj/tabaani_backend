const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;

module.exports = async (userEmail, firstName, id, resetToken, origin) => {
  try {
    await resend.emails.send({
      from: `TABAANI <${EMAIL}>`,
      to: userEmail,
      subject: "Restore your Password",
      javascripthtml: `
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
              <h2 style="margin:0 0 8px 0; color:#1d4ed8; font-size:24px;">Password Reset Request 🔐</h2>
              <p style="margin:0 0 24px 0; color:#374151; font-size:16px; line-height:1.6;">
                Hello <strong>${firstName}</strong>, we received a request to reset your TABAANI account password.
              </p>

              <!-- Info box -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#eff6ff; border-left:4px solid #3b82f6; border-radius:8px; padding:20px 24px;">
                    <p style="margin:0; color:#374151; font-size:14px; line-height:1.6;">
                      Click the button below to reset your password. This link will 
                      <strong style="color:#1d4ed8;">expire in 15 minutes</strong> for security reasons.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${origin}/reset-password/${resetToken}" target="_blank"
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
                      🔐 Reset My Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="margin:0 0 32px 0; color:#9ca3af; font-size:13px; text-align:center; line-height:1.6;">
                If the button does not work, copy and paste this link in your browser:<br>
                <a href="${origin}/reset-password/${resetToken}" style="color:#3b82f6; word-break:break-all;">
                  ${origin}/reset-password/${resetToken}
                </a>
              </p>

              <!-- Warning box -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="background:#fef2f2; border-left:4px solid #ef4444; border-radius:8px; padding:16px 24px;">
                    <p style="margin:0; color:#7f1d1d; font-size:14px; line-height:1.6;">
                      ⚠️ <strong>Did not request this?</strong> If you did not request a password reset, please ignore this email. Your password will remain unchanged.
                    </p>
                  </td>
                </tr>
              </table>

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
                For security, this link expires in 15 minutes and can only be used once.
              </p>
              <p style="margin:0; color:#9ca3af; font-size:12px;">
  © ${new Date().getFullYear()} TABAANI · All rights reserved
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
