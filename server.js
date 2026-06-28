require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/connect");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const guideRoute = require("./routes/guide.route");
const touristRoute = require("./routes/tourist.route");
const app = express();
require("./config/cron");
// const corsOptions = {
//   origin: process.env.CLIENT_URL, // only allow your frontend
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.CLIENT_URL];

    // allow any lovable.app subdomain
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".lovable.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// middlewares
app.use(express.json());
// db connection
connect(process.env.URI);

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/guide", guideRoute);
app.use("/api/tourist", touristRoute);
// listenning
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is app und running on ${port} ✅`);
});
