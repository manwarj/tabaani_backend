const express = require("express");
const route = express.Router();
const verifyToken = require("../middlewares/verifyToken.controller");
const verifyRole = require("../middlewares/verifyRole.controller");
route.put(
  "/profile",
  verifyToken,
  verifyRole("guide"),
  require("../controllers/guide/update-infos.controller"),
);

module.exports = route;
