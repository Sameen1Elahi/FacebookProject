const mysql = require('mysql2/promise');

// Async function to handle the database insertion
async function addFriend(userId, friendUserId) {
  let connection;
  
  try {
    console.log("hello0");
    // Create a connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'uthe@rakh1Q',
      database: 'facebook',
      namedPlaceholders: true
    });
    console.log("hello1");
    // Prepare the SQL query and data
    const sql ="INSERT INTO friend SET user_id=:userId, friend_user_id=:friendUserId";
    const sqlObject = {user_id:userId, friend_user_id :friendUserId};
    console.log(sql);
    // Execute the query
    const [result] = await connection.execute(sql, sqlObject);

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

module.exports = {addFriend};

