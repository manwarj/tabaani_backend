require("dotenv").config();
const express = require("express");
const connect = require("./config/connect");
const authRoute = require("./routes/auth.route");
const app = express();
// middlewares
app.use(express.json());
// db connection
connect(process.env.URI);

// routes
app.use("/api/auth", authRoute);

// listenning
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is app und running on ${port} ✅`);
});
