const express = require('express');
const router = express.Router();
const aiTeamController = require('../controllers/aiTeamController');

router.post('/balance-teams', aiTeamController.balanceTeams);

module.exports = router;