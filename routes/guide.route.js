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
route.put(
  "/booking/:bookingId",
  verifyToken,
  require("../controllers/guide/update-booking.controller"),
);
route.put(
  "/booking/:bookingId/cancel",
  verifyToken,
  verifyRole("guide"),
  require("../controllers/guide/cancel-booking.controller"),
);
route.get(
  "/bookings",
  verifyToken,
  verifyRole("guide"),
  require("../controllers/guide/get-bookings.controller"),
);
module.exports = route;
