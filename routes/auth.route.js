const express = require("express");
const route = express.Router();
const verifyResetToken = require("../middlewares/verifyResetToken.controller");
route.post("/register", require("../controllers/auth/register.controller"));
route.post("/login", require("../controllers/auth/login.controller"));
route.get(
  "/verify-account/:id",
  require("../controllers/auth/verifyAccount.controller"),
);
route.get("/forgot-pwd", require("../controllers/auth/forgot-pwd.controller"));
route.post(
  "/reset-pwd",
  verifyResetToken,
  require("../controllers/auth/reset-pwd.controller"),
);
module.exports = route;
