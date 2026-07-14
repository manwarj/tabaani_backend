require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/connect");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const guideRoute = require("./routes/guide.route");
const touristRoute = require("./routes/tourist.route");
const adminRoute = require("./routes/admin.route");
const app = express();
require("./config/cron");

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://tabaani.nl",
      "https://id-preview--0f0167ac-0a28-46f3-8b16-840c509e0d13.lovable.app",
      " https://0f0167ac-0a28-46f3-8b16-840c509e0d13.lovableproject.com",
      "https://www.tabaani.nl",

      process.env.CLIENT_URL,
    ];

    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".lovable.app") ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked origin:", origin);
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
app.use("/api/admin", adminRoute);
// listenning
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is app und running on ${port} ✅`);
});
