const argon2 = require('argon2');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'qweasdzxc',
  database: 'admin'
};

async function hashPasswords() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    

    const [users] = await connection.query('SELECT adminId, adminPassword FROM admininfo WHERE adminPassword IS NOT NULL');

    for (let user of users) {
      const hashedPassword = await argon2.hash(user.adminPassword);
      await connection.query('UPDATE admininfo SET adminPassword = ? WHERE adminId = ?', [hashedPassword, user.adminId]);
    }

    console.log('All passwords have been hashed successfully.');
  } catch (err) {
    console.error('Error hashing passwords:', err);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

hashPasswords();
