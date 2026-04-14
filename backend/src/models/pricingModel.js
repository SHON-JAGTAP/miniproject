const db = require('../config/database');

class Pricing {
    static async createPricingRule(data) {
        try {
            const { turf_id, base_price, weather_condition, price_multiplier, time_slot } = data;
            
            const query = `
                INSERT INTO pricing_rules (turf_id, base_price, weather_condition, price_multiplier, time_slot)
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [turf_id, base_price, weather_condition, price_multiplier, time_slot]);
            return result.insertId;
        } catch (error) {
            throw new Error(`Failed to create pricing rule: ${error.message}`);
        }
    }

    static async calculateDynamicPrice(turfId, weatherCondition, timeSlot) {
        try {
            const query = `
                SELECT base_price, price_multiplier 
                FROM pricing_rules 
                WHERE turf_id = ? AND weather_condition = ? AND time_slot = ?
            `;
            const [rows] = await db.query(query, [turfId, weatherCondition, timeSlot]);
            
            if (rows.length > 0) {
                const { base_price, price_multiplier } = rows[0];
                return base_price * price_multiplier;
            }
            
            // Default pricing if no rule found
            const defaultQuery = `SELECT base_price FROM pricing_rules WHERE turf_id = ? LIMIT 1`;
            const [defaultRows] = await db.query(defaultQuery, [turfId]);
            return defaultRows.length > 0 ? defaultRows[0].base_price : 1000;
            
        } catch (error) {
            throw new Error(`Failed to calculate price: ${error.message}`);
        }
    }

    static async getAllPricingRules() {
        try {
            const [rows] = await db.query('SELECT * FROM pricing_rules ORDER BY created_at DESC');
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch pricing rules: ${error.message}`);
        }
    }
}

module.exports = Pricing;