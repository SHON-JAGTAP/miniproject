const db = require('../config/database');

class Turf {
    static async create(data) {
        try {
            const { title, location, description, price, type, slug, img } = data;
            
            if (!title || !location || !description || !price || !type || !slug) {
                throw new Error('All fields are required');
            }
            
            const id = Date.now(); // Generate unique ID
            const query = `
                INSERT INTO Turf (id, title, location, description, price, type, slug, img)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            await db.execute(query, [id, title, location, description, price, type, slug, img]);
        } catch (error) {
            throw new Error(`Failed to create turf: ${error.message}`);
        }
    }

    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM Turf');
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch turfs: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            if (!id) throw new Error('ID is required');
            const [rows] = await db.query('SELECT * FROM Turf WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Failed to fetch turf: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            if (!id) throw new Error('ID is required');
            await db.execute('DELETE FROM Turf WHERE id = ?', [id]);
        } catch (error) {
            throw new Error(`Failed to delete turf: ${error.message}`);
        }
    }

    static async search(filters) {
        try {
            let query = 'SELECT * FROM Turf WHERE 1=1';
            const params = [];

            if (filters.location) {
                query += ' AND location LIKE ?';
                params.push(`%${filters.location}%`);
            }
            if (filters.type) {
                query += ' AND type LIKE ?';
                params.push(`%${filters.type}%`);
            }
            if (filters.slug) {
                query += ' AND slug = ?';
                params.push(filters.slug);
            }

            const [rows] = await db.query(query, params);
            return rows;
        } catch (error) {
            throw new Error(`Failed to search turfs: ${error.message}`);
        }
    }
}

module.exports = Turf;
