const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    const exist = await Student.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new Student({ name, email, password: hashed, course });
    await user.save();

    res.json({ msg: "Registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

// UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
  const user = await Student.findById(req.user.id);

  const match = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  user.password = await bcrypt.hash(req.body.newPassword, 10);
  await user.save();

  res.json({ msg: "Password updated" });
});

// UPDATE COURSE
router.put("/update-course", auth, async (req, res) => {
  const user = await Student.findById(req.user.id);

  user.course = req.body.course;
  await user.save();

  res.json({ msg: "Course updated" });
});
// GET USER DETAILS
router.get("/me", auth, async (req, res) => {
  const user = await Student.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;