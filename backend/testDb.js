require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });
    console.log('✅ Database connected successfully!');
    
    // Check if users table exists
    const [tables] = await connection.query('SHOW TABLES LIKE "users"');
    if (tables.length > 0) {
      console.log('✅ Users table exists');
      const [rows] = await connection.query('SELECT COUNT(*) as count FROM users');
      console.log('📊 Total users in DB:', rows[0].count);
    } else {
      console.log('❌ Users table NOT found');
    }
    
    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
  process.exit(0);
}

testConnection();
