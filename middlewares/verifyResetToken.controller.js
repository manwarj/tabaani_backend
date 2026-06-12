const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const RESET_SECRET = process.env.RESET_SECRET;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(400)
      .json({ status: false, error: "Invalid request! Token is required" });
  }
  jwt.verify(token, RESET_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, error: err.message });
    }
    // req.clientId = decoded.id;
    req.user = decoded;
    next();
  });
};
