const db = require('./src/config/database');

async function createTurfTable() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Turf (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT,
        price VARCHAR(100),
        type VARCHAR(100),
        slug VARCHAR(100),
        img VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await db.execute(createTableQuery);
    console.log('✅ Turf table created or already exists');
    
    // Test connection
    const [rows] = await db.query('SELECT COUNT(*) as count FROM Turf');
    console.log(`📊 Current turf count: ${rows[0].count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTurfTable();