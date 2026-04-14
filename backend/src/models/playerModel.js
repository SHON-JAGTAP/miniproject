const db = require('../config/database');

class Player {
    static async create(data) {
        try {
            const { name, age, experience, position, skill, credits } = data;
            
            const query = `
                INSERT INTO players (name, age, experience, position, skill, credits)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [name, age, experience, position, skill, credits]);
            return result.insertId;
        } catch (error) {
            throw new Error(`Failed to create player: ${error.message}`);
        }
    }

    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM players ORDER BY created_at DESC');
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch players: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            await db.execute('DELETE FROM players WHERE id = ?', [id]);
        } catch (error) {
            throw new Error(`Failed to delete player: ${error.message}`);
        }
    }
}

module.exports = Player;