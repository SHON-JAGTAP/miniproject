const Pricing = require('../models/pricingModel');
const axios = require('axios');

exports.getDynamicPrice = async (req, res) => {
    try {
        const { turfId, city, timeSlot } = req.query;
        
        if (!turfId || !city || !timeSlot) {
            return res.status(400).json({ error: 'turfId, city, and timeSlot are required' });
        }

        // Get current weather
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );

        const weatherCondition = categorizeWeather(weatherResponse.data);
        const dynamicPrice = await Pricing.calculateDynamicPrice(turfId, weatherCondition, timeSlot);

        res.json({
            turfId,
            city,
            timeSlot,
            weatherCondition,
            currentWeather: weatherResponse.data.weather[0].description,
            temperature: weatherResponse.data.main.temp,
            dynamicPrice,
            priceDetails: {
                basePrice: 1000, // You can get this from turf table
                weatherMultiplier: getWeatherMultiplier(weatherCondition),
                finalPrice: dynamicPrice
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPricingRule = async (req, res) => {
    try {
        const { turf_id, base_price, weather_condition, price_multiplier, time_slot } = req.body;
        
        const ruleId = await Pricing.createPricingRule({
            turf_id, base_price, weather_condition, price_multiplier, time_slot
        });
        
        res.status(201).json({ 
            message: 'Pricing rule created successfully', 
            ruleId 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPricingRules = async (req, res) => {
    try {
        const rules = await Pricing.getAllPricingRules();
        res.json(rules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function categorizeWeather(weatherData) {
    const description = weatherData.weather[0].main.toLowerCase();
    const temp = weatherData.main.temp;
    
    if (description.includes('rain') || description.includes('drizzle')) {
        return 'rainy';
    } else if (description.includes('cloud')) {
        return 'cloudy';
    } else if (description.includes('clear') && temp > 25 && temp < 35) {
        return 'perfect';
    } else if (temp > 35) {
        return 'hot';
    } else if (temp < 15) {
        return 'cold';
    } else {
        return 'normal';
    }
}

function getWeatherMultiplier(weatherCondition) {
    const multipliers = {
        'perfect': 1.2,    // 20% increase for perfect weather
        'normal': 1.0,     // Base price
        'cloudy': 0.9,     // 10% discount for cloudy
        'rainy': 0.7,      // 30% discount for rainy
        'hot': 0.8,        // 20% discount for too hot
        'cold': 0.8        // 20% discount for too cold
    };
    
    return multipliers[weatherCondition] || 1.0;
}