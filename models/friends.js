
const connection = require('./connection.js');

// add new friend 
module.exports = async function deleteFriend(userId,friendUserId) {
  try {
    const sql ="INSERT INTO friend SET user_id=:userId, friend_user_id=:friendUserId";
    const sqlObject = {user_id:userId, friend_user_id:friendUserId};
    const [result] = await (await connection).execute(sql, sqlObject);
    return result;
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; 
  } 
}


// search all friends for the specific user 
module.exports = async function searchFriends(userId) {
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
module.exports = async function deleteFriend(userId,friendUserId) {
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



