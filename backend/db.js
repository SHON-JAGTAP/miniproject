// backend/db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Cse@2024",   // ← put your MySQL password here
  database: "turfdb",
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    throw err;
  }
  console.log("✅ MySQL Connected.");
});

module.exports = db;
