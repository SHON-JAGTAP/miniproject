const express = require('express');
const router = express.Router();
const { handleChatQuery } = require('../controllers/chatbotController');

router.post('/chatbot/query', handleChatQuery);

module.exports = router;