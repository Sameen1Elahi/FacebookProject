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
    
    // Prepare the SQL query and data
    const sql1 = "SELECT * FROM user WHERE id = ?"
    const [rows, fields] = await connection.execute(sql1,[userId]);
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


async function postUserLike(userId,person) {
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
      const sql1 = "SELECT * FROM user WHERE id = ?"
      const [rows, fields] = await connection.execute(sql1,[userId]);
      console.log(rows);
        if (rows.length>0){
          const sql = "INSERT INTO post_user_like SET post_id=:person, user_id=:userId";
          console.log('after sql');
          const obj = {post_id: person, user_id: userId};
          const [result] = await connection.execute(sql, obj);
          console.log('after sql execution');
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
  


  module.exports.postUserLike = postUserLike;
  module.exports.postOnFb = postOnFb;


