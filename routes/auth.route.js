const express = require("express");
const route = express.Router();
const verifyResetToken = require("../middlewares/verifyResetToken.controller");
// register
route.post("/register", require("../controllers/auth/register.controller"));
// login
route.post("/login", require("../controllers/auth/login.controller"));
// verify account
route.get(
  "/verify-account/:id",
  require("../controllers/auth/verifyAccount.controller"),
);
// forget password
route.get("/forgot-pwd", require("../controllers/auth/forgot-pwd.controller"));
// resett password
route.post(
  "/reset-pwd",
  verifyResetToken,
  require("../controllers/auth/reset-pwd.controller"),
);
module.exports = route;
