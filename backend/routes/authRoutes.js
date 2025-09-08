// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Signin route
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error during signin:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      const user = results[0];
      return res.json({ user });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Signup route (if needed)
router.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;

  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, password, role], (err, result) => {
    if (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({ message: "User registered successfully" });
  });
});

module.exports = router;
