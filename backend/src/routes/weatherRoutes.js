const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Test route
router.get('/weather/test', (req, res) => {
  res.json({ message: 'Weather routes working!' });
});

router.get('/weather/current', weatherController.getCurrentWeather);
router.get('/weather/forecast', weatherController.getWeatherForecast);

module.exports = router;