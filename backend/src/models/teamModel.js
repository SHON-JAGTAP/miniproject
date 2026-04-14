const db = require('../config/database');

class Team {
    static async create(data) {
        try {
            const { team_name, players, total_credits, performance_data } = data;
            
            const query = `
                INSERT INTO teams (team_name, players, total_credits, performance_data)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [
                team_name, 
                JSON.stringify(players), 
                total_credits, 
                JSON.stringify(performance_data)
            ]);
            return result.insertId;
        } catch (error) {
            throw new Error(`Failed to create team: ${error.message}`);
        }
    }

    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM teams ORDER BY created_at DESC');
            return rows.map(row => ({
                ...row,
                players: JSON.parse(row.players),
                performance_data: JSON.parse(row.performance_data)
            }));
        } catch (error) {
            throw new Error(`Failed to fetch teams: ${error.message}`);
        }
    }
}

module.exports = Team;