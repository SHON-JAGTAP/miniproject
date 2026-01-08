const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

router.get('/pricing/dynamic', pricingController.getDynamicPrice);
router.post('/pricing/rules', pricingController.createPricingRule);
router.get('/pricing/rules', pricingController.getAllPricingRules);

module.exports = router;