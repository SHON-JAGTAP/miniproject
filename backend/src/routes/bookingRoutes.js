// backend/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ POST new booking
router.post("/", (req, res) => {
  const {
    userEmail,
    userName,
    turfName,
    date,
    fromTime,
    toTime,
    paid,
    status,
  } = req.body;

  const query = `
    INSERT INTO bookings (userEmail, userName, turfName, date, fromTime, toTime, paid, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userEmail, userName, turfName, date, fromTime, toTime, paid, status],
    (err, result) => {
      if (err) {
        console.error("Error inserting booking:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true, message: "Booking created", id: result.insertId });
    }
  );
});

// ✅ GET all bookings
router.get("/", (req, res) => {
  const query = "SELECT * FROM bookings";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ PUT update booking status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = "UPDATE bookings SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error("Error updating booking status:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, message: "Booking status updated" });
  });
});
// GET /api/bookings/booked-slots
router.get("/booked-slots", (req, res) => {
  const { turfName, date } = req.query;

  const sql = `SELECT fromTime, toTime FROM bookings WHERE turfName = ? AND date = ?`;
  db.query(sql, [turfName, date], (err, results) => {
    if (err) {
      console.error("Error fetching booked slots", err);
      return res.status(500).json({  error: "Database error" });
    }
    res.json(results);
  });
});


module.exports = router;
