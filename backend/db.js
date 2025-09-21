const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',       
  user: 'root',            
  password: 'Bhavya@123!',    
  database: 'contact_book',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    const conn = await pool.getConnection();
    await conn.query(createTableSQL);
    conn.release();
    console.log("Contacts table ready in MySQL");
  } catch (err) {
    console.error("Error creating table:", err);
  }
})();

module.exports = pool;
