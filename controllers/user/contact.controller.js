const contactEmail = require("../../config/contact-email");

module.exports = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        status: false,
        error: "All fields are required",
      });
    }

    await contactEmail(name, email, subject, message);

    res.status(200).json({
      status: true,
      message: "Your message was sent successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, error: error.message });
  }
};
