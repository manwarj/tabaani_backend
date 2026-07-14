const express = require("express");
const route = express.Router();
const verifyAdminToken = require("../middlewares/verifyAdminToken.controller");

route.post("/register", require("../controllers/admin/register.controller"));

module.exports = route;
 