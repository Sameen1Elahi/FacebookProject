
const connection = require('./connection.js');

// add new friend 
async function addFriend(res,payload) {
  const {userId,friendUserId} = payload;
  try {
    const sqlObject = {user_id:userId, friend_user_id:friendUserId};
    const columns = Object.keys(sqlObject).join(', '); // 'name, price, quantity, category'
    const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); // '?, ?, ?, ?'
    const values = Object.values(sqlObject); // [ 'Laptop', 999.99, 5, 'Electronics' ]
    
    const sql = `INSERT INTO friend (${columns}) values (${placeholders})`;    
    const [result] = await (await connection).execute(sql, values);
    return result;
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; 
  } 
}


// search all friends for the specific user 
async function searchFriends(res,payload) {
  const {userId} = payload;
  try {
    const sql = "SELECT * FROM user u JOIN friend f ON f.friend_user_id = u.id WHERE f.user_id = ? AND f.deleted_at IS NULL";
    const [result] = await (await connection).execute(sql, [userId]);
    return result;
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; 
  } 
}

// delete specific friend 
async function deleteFriend(res,payload) {
  const {userId,friendUserId} = payload;
  try {
    const sql = "UPDATE friend SET deleted_at = NOW() WHERE user_id = ? AND friend_user_id = ?";
    const [result] = await (await connection).execute(sql, [userId,friendUserId]);
    return result;
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; 
  } 
}


module.exports = { addFriend, searchFriends, deleteFriend };
