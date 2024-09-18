
//const connection = require('./connection.js');

// add new user in database - sign up 
async function insertUser(res, payload) {
 
  const {name, password, email} = payload;
  let connection = res.connection2;
  try {
    const sqlObject = { name: name, password: password, email: email };
    const columns = Object.keys(sqlObject).join(', '); // 'name, price, quantity, category'
    const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); // '?, ?, ?, ?'
    const values = Object.values(sqlObject); // [ 'Laptop', 999.99, 5, 'Electronics' ]
    
    const sql = `INSERT INTO user (${columns}) values (${placeholders})`;
    const [result] = await (await connection).execute(sql, values);
    return result;
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; 
  } 
}

// login the user
async function loginUser(res, payload) {
  let connection = res.connection2;
  const {name,password} = payload;
  try {
    const sql = 'SELECT * FROM user WHERE name = ? AND password = ?';
    const [result] = await (await connection).execute(sql, [name, password]);
    return result;
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; 
  } 
}


module.exports = { insertUser, loginUser };




