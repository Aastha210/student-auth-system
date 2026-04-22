const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// routes
app.use("/api", require("./routes/authRoutes"));

// server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});