const express = require('express');
const router = express.Router();
const turfController = require('../controllers/addTurfcontroller');

// Public routes for users to view turfs
router.get('/', turfController.getAllTurfs);
router.get('/search', turfController.searchTurfs);
router.get('/:id', turfController.getTurfById);

module.exports = router;