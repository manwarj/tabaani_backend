const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUserEmail = await User.findOne({ email });
    if (!checkUserEmail) {
      return res.status(401).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    const checkPwd = bcrypt.compareSync(password, checkUserEmail.password);
    if (!checkPwd) {
      return res.status(401).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    if (!checkUserEmail.isVerified) {
      return res.status(403).json({
        status: false,
        error: "Email is not verified! Please check your mailbox",
      });
    }
    if (checkUserEmail.isBanned) {
      return res.status(406).json({
        status: false,
        error: "Your account has been suspended, please contact support.",
      });
    }
    //   token
    const token = jwt.sign(
      {
        id: checkUserEmail._id,
        email: checkUserEmail.email,
        role: checkUserEmail.role,
        firstName: checkUserEmail.firstName,
      },
      SECRET_KEY,
      {
        expiresIn: "1 day",
      },
    );
    res
      .status(200)
      .json({ status: true, data: { token, role: checkUserEmail.role } });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: false, error });
  }
};
