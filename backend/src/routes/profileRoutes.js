// backend/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET user profile by email
router.get("/:email", (req, res) => {
  const email = req.params.email;
  db.query(
    "SELECT name, email, role FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(result[0]);
    }
  );
});

// ✅ UPDATE name by email
router.put("/:email", (req, res) => {
  const email = req.params.email;
  const { name } = req.body;
  db.query(
    "UPDATE users SET name = ? WHERE email = ?",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update error" });
      res.json({ message: "Profile updated" });
    }
  );
});

// ✅ CHANGE PASSWORD route (no hashing)
router.put("/change-password", (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  console.log("🔁 Received request:", { email, oldPassword, newPassword });

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // STEP 1: Check if email & old password match
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, oldPassword],
    (err, result) => {
      if (err) {
        console.error("❌ DB error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (result.length === 0) {
        console.warn("⚠️ Incorrect old password or email");
        return res
          .status(401)
          .json({ message: "❌ Old password is incorrect" });
      }

      // STEP 2: Update password
      db.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [newPassword, email],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("❌ Update error:", updateErr);
            return res
              .status(500)
              .json({ message: "❌ Failed to update password" });
          }

          console.log("✅ Password updated for:", email);
          return res.json({ message: "✅ Password updated successfully" });
        }
      );
    }
  );
});

module.exports = router;


