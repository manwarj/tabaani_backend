const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(401).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    const checkPwd = bcrypt.compareSync(password, checkUser.password);
    if (!checkPwd) {
      return res.status(401).json({
        status: false,
        error: "Wrong email or password, please try again",
      });
    }
    if (!checkUser.isVerified) {
      return res.status(403).json({
        status: false,
        error: "Email is not verified! Please check your mailbox",
      });
    }
    if (checkUser.isBanned) {
      return res.status(406).json({
        status: false,
        error: "Your account has been suspended, please contact support.",
      });
    }
    //   token
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
        firstName: checkUser.firstName,
        ...(checkUser.role === "guide" && { guideId: checkUser.guideId }),
      },
      SECRET_KEY,
      {
        expiresIn: "1 day",
      },
    );
    res
      .status(200)
      .json({ status: true, data: { token, role: checkUser.role } });
  } catch (error) {
    console.log(error);
    res.status(406).json({ status: false, error });
  }
};
