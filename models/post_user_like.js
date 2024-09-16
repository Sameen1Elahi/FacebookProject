const mysql = require('mysql2/promise');

// Async function to handle the database insertion
async function postOnFb(userId,image) {
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
    console.log('hello');
    // Prepare the SQL query and data
    const sql1 = "SELECT * FROM user WHERE id = ?"
    const [rows, fields] = await connection.execute[sql1,[userId]];
    console.log(rows);
      if (rows.length>0){
        const sql = "INSERT INTO post(userId, image) VALUES (?,?)"
        const [result] = await connection.execute(sql, [userId,image]);
        return result;
      }
    
    // Return the result
    //return result;
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


module.exports = {postOnFb};


