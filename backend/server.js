// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db");

// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json());

// // DB
// connectDB();

// // test route
// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// // routes
// app.use("/api", require("./routes/authRoutes"));

// // server
// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// API routes
app.use("/api", require("./routes/authRoutes"));

/* =========================
   SERVE REACT FRONTEND
========================= */

// IMPORTANT: adjust path if needed
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// React routing fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});