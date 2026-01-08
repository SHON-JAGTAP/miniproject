const Turf = require('../models/addTurfmodel');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const handleChatQuery = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await processQuery(message.toLowerCase());
        
        res.json({
            userMessage: message,
            botResponse: response,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function processQuery(query) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
        const prompt = `You are a helpful AI assistant for TurfBooking. Answer in max 100 words.
        
        Services: Cricket, Football, Hockey, Rugby, Golf, Tennis
        Pricing: Cricket/Hockey/Tennis ₹1000/hr, Football/Rugby ₹1200/hr, Golf ₹1300/hr
        Weather pricing: Perfect +20%, Rainy -30%, Cloudy -10%
        Cities: Mumbai, Delhi, Pune, Bangalore, Chennai, Kolkata
        Contact: +91 1234567890
        
        Question: ${query}`;

        const result = await model.generateContent(prompt);
        return result.response.text();
        
    } catch (error) {
        return getFallbackResponse(query);
    }
}

function getFallbackResponse(query) {
    if (query.includes('book') || query.includes('booking')) {
        return "To book a turf: 1) Select your preferred turf 2) Choose date and time 3) Make payment 4) Confirm booking. Visit our 'Book Now' page to get started!";
    }
    if (query.includes('price') || query.includes('cost')) {
        return "Turf prices: Cricket/Hockey/Tennis ₹1000/hr, Football/Rugby ₹1200/hr, Golf ₹1300/hr. Weather-based discounts available!";
    }
    if (query.includes('weather')) {
        return "We offer dynamic weather-based pricing! Perfect weather gets +20% premium, while rainy conditions get 30% discount.";
    }
    if (query.includes('team')) {
        return "Use our Team Creation feature to build balanced teams with AI assistance! Each team gets 200 credits.";
    }
    return "I'm here to help with turf bookings! Ask me about booking, pricing, weather discounts, or contact +91 1234567890.";
}

module.exports = { handleChatQuery };