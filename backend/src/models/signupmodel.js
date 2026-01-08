const bcrypt = require('bcrypt');
const db = require('../config/database'); 

class SignupUsers {
  static async signupUser({ username, email, password, role }) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ? OR username = ?',
        [email, username]
      );

      if (rows.length > 0) {
        return { error: 'User with this email or username already exists' };
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await db.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role]
      );

      return { success: true };
    } catch (err) {
      console.error('Error in signupUser model:', err);
      throw err;
    }
  }
}

module.exports = SignupUsers;

