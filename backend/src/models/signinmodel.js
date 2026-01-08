const bcrypt = require('bcrypt');
const db = require('../config/database');

class SigninUsers {

  static async authenticateUser(email, password) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (rows.length === 0) {
        return { error: 'No user found with this email' };
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return { error: 'Invalid password' };
      }

      // Remove password field before returning user object for security
      delete user.password;

      return { user };
    } catch (err) {
      console.error('Error in authenticateUser model:', err);
      throw err;
    }
  }
}

module.exports = SigninUsers;
