const mysql = require('mysql2/promise');

// Async function to handle the database insertion
async function deleteFriend(userId,friendUserId) {
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
    const sql = "UPDATE friend SET deleted_at = NOW() WHERE user_id = ? AND friend_user_id = ?";
    // Execute the query
    const [result] = await connection.execute(sql, [userId,friendUserId]);

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

module.exports = {deleteFriend};

