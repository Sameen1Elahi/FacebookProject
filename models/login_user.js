const mysql = require('mysql2/promise');

// Async function to handle the database insertion
async function loginUser(name, password) {
  let connection;
  
  try {
    // Create a connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'uthe@rakh1Q',
      database: 'facebook',
      namedPlaceholders: true
    });
    
    // Prepare the SQL query and data
    const sql = 'SELECT * FROM user WHERE name = ? AND password = ?';
    // Execute the query
    const [result] = await connection.execute(sql, [name, password]);

    // Return the result
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; // Re-throw the error to handle it in the route handler
  } finally {
    // Ensure the connection is closed
    if (connection) {
      await connection.end();
    }
  }
}

// Export the function

module.exports = {loginUser};

