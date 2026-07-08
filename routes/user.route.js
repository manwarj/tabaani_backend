const express = require("express");
const route = express.Router();
const verifyToken = require("../middlewares/verifyToken.controller");
const multer = require("../middlewares/multer");

// get profile
route.get(
  "/profile",
  verifyToken,
  require("../controllers/user/getProfile.controller"),
);

//  update photo
route.put(
  "/update-photo",
  verifyToken,
  multer.single("photo"),
  require("../controllers/user/updateImage.controller"),
);
//  update profile information
route.put(
  "/profile",
  verifyToken,
  require("../controllers/user/update-profile.controller"),
);
//  update email
route.put(
  "/update-email",
  verifyToken,
  require("../controllers/user/update-email.controller"),
);
//  update password
route.put(
  "/update-password",
  verifyToken,
  require("../controllers/user/update-password.controller"),
);
route.get(
  "/guides",
  require("../controllers/user/get-guides.controller"),
);
route.get(
  "/guide/:id",
  require("../controllers/user/get-guide.controller"),
);
route.get(
  "/reviews/:guideId",
  require("../controllers/user/get-reviews.controller"),
);
app.post("/contact", require("./controllers/user/contact.controller"));

module.exports = route;
