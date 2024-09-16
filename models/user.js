// Import the mysql2 library
const mysql = require('mysql2/promise');
// Async function to handle the database query
async function getData() {
 let connection;
 try {
   // Create a connection
   connection = await mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'password',
     database: 'your_database'
   });
   // Execute a query
   const [rows, fields] = await connection.execute('SELECT * FROM user');
   // Return or process rows
   return rows;
 } catch (error) {
   console.error('Error executing query:', error);
 } finally {
   // Ensure connection is closed
   if (connection) {
     await connection.end();
   }
 }
}
// Usage of the async function
getData().then((data) => {
 console.log(data);
}).catch((err) => {
 console.error(err);
});