const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(400)
      .json({ status: false, error: "Invalid request! Token is required" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, error: err.message });
    }
    req.user = decoded;
    next();
  });
};
