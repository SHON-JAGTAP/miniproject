const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/teams', teamController.createTeam);
router.get('/teams', teamController.getAllTeams);

module.exports = router;