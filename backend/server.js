// backend/server.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const session = require('express-session');
//const passport = require('passport');
const flash = require('connect-flash');
const signinRoutes = require('./src/routes/signinRoute');
const signupRoutes = require('./src/routes/signupRoutes');
const addTurfRoutes = require('./src/routes/addTurfRoutes');
const playerRoutes = require('./src/routes/playerRoutes');
const teamRoutes = require('./src/routes/teamRoutes');
const aiTeamRoutes = require('./src/routes/aiTeamRoutes');
const weatherRoutes = require('./src/routes/weatherRoutes');
const pricingRoutes = require('./src/routes/pricingRoutes');
const chatbotRoutes = require('./src/routes/chatbotRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// const authRoutes = require("./routes/authRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const profileRoutes = require("./routes/profileRoutes");


app.use(cors({}));
// app.use(cors({
//   origin: 'http://localhost:3000',  // change to your frontend URL
//   credentials: true,
// }));





// Middleware to parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'aVeryLongRandomSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // secure: true if using HTTPS
}));

// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/signin', signinRoutes);
app.use('/api/turfs', addTurfRoutes);
app.use('/api', playerRoutes);
app.use('/api', teamRoutes);
app.use('/api', aiTeamRoutes);
app.use('/api', weatherRoutes);
app.use('/api', pricingRoutes);
app.use('/api', chatbotRoutes);
app.use('/api/payment', paymentRoutes);

// If you have authRoutes in future, uncomment the next line
// app.use("/api", authRoutes);



// Other routes can be mounted similarly as you add them
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/profile", profileRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});