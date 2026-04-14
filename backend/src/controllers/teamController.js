const Team = require('../models/teamModel');

exports.createTeam = async (req, res) => {
    try {
        const { team_name, players, total_credits, performance_data } = req.body;
        
        if (!team_name || !players) {
            return res.status(400).json({ error: 'Team name and players are required' });
        }

        const teamId = await Team.create({ team_name, players, total_credits, performance_data });
        res.status(201).json({ message: 'Team created successfully', teamId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.getAll();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};