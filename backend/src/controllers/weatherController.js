const axios = require('axios');

// Get weather API key from environment variables
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'your_api_key_here';

exports.getCurrentWeather = async (req, res) => {
    try {
        const { city } = req.query;
        
        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            icon: response.data.weather[0].icon
        };

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

exports.getWeatherForecast = async (req, res) => {
    try {
        const { city } = req.query;
        
        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const forecast = response.data.list.slice(0, 5).map(item => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            time: new Date(item.dt * 1000).toLocaleTimeString(),
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon
        }));

        res.json({
            city: response.data.city.name,
            forecast: forecast
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather forecast' });
    }
};