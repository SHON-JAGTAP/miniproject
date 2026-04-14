const db = require('../config/database');
const bcrypt = require('bcrypt');

exports.createSigninUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res.json({ message: 'Signin successful', user: safeUser });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
