const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;

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
              <h2 style="margin:0 0 8px 0; color:#1d4ed8; font-size:24px;">Welcome, ${firstName}! 🧭</h2>
              <p style="margin:0 0 24px 0; color:#374151; font-size:16px; line-height:1.6;">
                Thank you for registering as a <strong style="color:#1d4ed8;">Local Guide</strong> on TABAANI. 
                We are excited to have you as part of our growing community of guides!
              </p>

              <!-- Step 1 -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#eff6ff; border-left:4px solid #3b82f6; border-radius:8px; padding:20px 24px;">
                    <p style="margin:0 0 8px 0; color:#1d4ed8; font-size:15px; font-weight:700;">
                      Step 1 — Verify Your Email
                    </p>
                    <p style="margin:0; color:#374151; font-size:14px; line-height:1.6;">
                      Please start by verifying your email address to activate your account.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:32px;">
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
                      ✉️ Verify My Email
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="margin:0 0 32px 0; color:#9ca3af; font-size:13px; text-align:center; line-height:1.6;">
                If the button does not work, copy and paste this link in your browser:<br>
                <a href="${origin}/verify-email/${id}" style="color:#3b82f6; word-break:break-all;">
                  ${origin}/verify-email/${id}
                </a>
              </p>

              <!-- Step 2 -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#eff6ff; border-left:4px solid #3b82f6; border-radius:8px; padding:20px 24px;">
                    <p style="margin:0 0 8px 0; color:#1d4ed8; font-size:15px; font-weight:700;">
                      Step 2 — Submit Your Documents
                    </p>
                    <p style="margin:0 0 16px 0; color:#374151; font-size:14px; line-height:1.6;">
                      To complete your guide account activation, please send the following documents to:
                      <a href="mailto:${EMAIL}" style="color:#3b82f6; font-weight:700;">${EMAIL}</a>
                    </p>

                    <!-- Documents list -->
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:8px 0; color:#374151; font-size:14px;">
                          📄 &nbsp; Valid ID or Passport
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; color:#374151; font-size:14px; border-top:1px solid #dbeafe;">
                          📄 &nbsp; Criminal Record Certificate
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; color:#374151; font-size:14px; border-top:1px solid #dbeafe;">
                          📄 &nbsp; Proof of Experience
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; color:#374151; font-size:14px; border-top:1px solid #dbeafe;">
                          📄 &nbsp; Official Tour Guide License
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Note -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="background:#fefce8; border-left:4px solid #facc15; border-radius:8px; padding:16px 24px;">
                    <p style="margin:0; color:#713f12; font-size:14px; line-height:1.6;">
                      ⏳ <strong>Please Note:</strong> Your account will be fully activated once your documents are reviewed and approved by our team. This usually takes 1-3 business days.
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
                If you did not create a TABAANI guide account, you can safely ignore this email.
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
