const Signupmodel = require('../models/signupmodel'); // your user model

exports.createSignupUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields (username, email, password, role) are required' });
    }
    if (!['user', 'owner'].includes(role)) {
      return res.status(400).json({ error: 'Role must be user or owner' });
    }

    const result = await Signupmodel.signupUser({ username, email, password, role });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Controller error:', err);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const db = require('../config/database');
    const [rows] = await db.query(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(rows[0]); // user info with role, no password
  } catch (err) {
    console.error('getUser error:', err);
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};
