// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const profileRoutes = require("./routes/profileRoutes");
app.use(cors());
app.use(express.json());

// ✅ This connects /api/signin and /api/signup
app.use("/api", authRoutes);

// ✅ This connects /api/bookings
app.use("/api/bookings", bookingRoutes);
app.use("/api/profile", profileRoutes);
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
