const express = require("express");
const route = express.Router();
const verifyToken = require("../middlewares/verifyToken.controller");
const verifyRole = require("../middlewares/verifyRole.controller");

route.post(
  "/bookings/:gId",
  verifyToken,
  require("../controllers/tourist/book-guide.controller"),
);
route.put(
  "/bookings/:bookingId/cancel",
  verifyToken,
  verifyRole("tourist"),
  require("../controllers/tourist/cancel-booking.controller"),
);
route.get(
  "/bookings",
  verifyToken,
  verifyRole("tourist"),
  require("../controllers/tourist/get-bookings.controller"),
);
route.post(
  "/review/:bookingId",
  verifyToken,
  verifyRole("tourist"),
  require("../controllers/tourist/create-review.controller"),
);
module.exports = route;
