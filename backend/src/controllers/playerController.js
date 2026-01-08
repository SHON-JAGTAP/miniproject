const Player = require('../models/playerModel');

exports.createPlayer = async (req, res) => {
    try {
        const { name, age, experience, position, skill, credits } = req.body;
        
        if (!name || !age || !position || !skill || !credits) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const playerId = await Player.create({ name, age, experience, position, skill, credits });
        res.status(201).json({ message: 'Player created successfully', playerId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.getAll();
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        await Player.delete(id);
        res.json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};