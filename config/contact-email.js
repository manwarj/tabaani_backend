const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL = process.env.EMAIL;
module.exports = async (name, email, subject, message) => {
  try {
    await resend.emails.send({
      from: `TABAANI ${EMAIL}>`,
      to: "startuprentit@gmail.com",
      reply_to: email,
      subject: `[TABAANI Contact] ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f0f4ff; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4ff; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(59,130,246,0.10);">

          <!-- Header -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%); padding: 48px 40px;">
              <h1 style="margin:0; color:#ffffff; font-size:32px; letter-spacing:3px; font-weight:800;">TABAANI</h1>
              <p style="margin:8px 0 0 0; color:#bfdbfe; font-size:14px; letter-spacing:1px;">New Contact Message</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 48px 40px 32px 40px;">
              <h2 style="margin:0 0 24px 0; color:#1d4ed8; font-size:24px;">📩 New Message Received</h2>

              <!-- Sender Info -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#eff6ff; border-left:4px solid #3b82f6; border-radius:8px; padding:20px 24px;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:6px 0; color:#374151; font-size:14px;">
                          <strong style="color:#1d4ed8;">Name:</strong> &nbsp; ${name}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; color:#374151; font-size:14px; border-top:1px solid #dbeafe;">
                          <strong style="color:#1d4ed8;">Email:</strong> &nbsp;
                          <a href="mailto:${email}" style="color:#3b82f6;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; color:#374151; font-size:14px; border-top:1px solid #dbeafe;">
                          <strong style="color:#1d4ed8;">Subject:</strong> &nbsp; ${subject}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="background:#f8fafc; border-left:4px solid #60a5fa; border-radius:8px; padding:20px 24px;">
                    <p style="margin:0 0 8px 0; color:#1d4ed8; font-size:14px; font-weight:700;">Message:</p>
                    <p style="margin:0; color:#374151; font-size:14px; line-height:1.8;">
                      ${message}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Reply tip -->
              <p style="margin:24px 0 0 0; color:#9ca3af; font-size:13px; text-align:center;">
                You can reply directly to this email to respond to <strong>${name}</strong>
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
              <p style="margin:0; color:#9ca3af; font-size:12px;">
                © ${new Date().getFullYear()} TABAANI · All rights reserved
              </p>
              <p style="margin:8px 0 0 0;">
                <a href="https://tabaani.nl" style="color:#3b82f6; font-size:12px; text-decoration:none;">www.tabaani.nl</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });
  } catch (error) {
    console.log("Contact email failed:", error);
  }
};
