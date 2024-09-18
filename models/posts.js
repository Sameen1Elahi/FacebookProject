//const connection = require('./connection.js');


async function postOnFb(res,payload) {
  let connection = res.connection2;
  const {userId,image} = payload;
  try {
    const sql1 = "SELECT * FROM user WHERE id = ?"
    const [rows, fields] = await (await connection).execute(sql1,[userId]);
    //console.log(rows);
    if(rows.length>0){
      const sqlObject = {userId:userId, image:image};
      const columns = Object.keys(sqlObject).join(', '); // 'name, price, quantity, category'
      const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); // '?, ?, ?, ?'
      const values = Object.values(sqlObject); // [ 'Laptop', 999.99, 5, 'Electronics' ]
    
      const sql = `INSERT INTO post (${columns}) VALUES (${placeholders})`;
      const [result] = await (await connection).execute(sql, values);
      return result;
    }
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; // Re-throw the error to handle it in the route handler
  } 
}


async function postUserLike(res,payload) {
  let connection = res.connection2;
  const {userId,person} = payload;
  try {
    const sql1 = "SELECT * FROM user WHERE id = ?"
    const [rows, fields] = await (await connection).execute(sql1,[userId]);
    //console.log(rows);
    if(rows.length>0){
      const sqlObject = {user_id:userId, post_id:person};
      const columns = Object.keys(sqlObject).join(', '); 
      const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
      const values = Object.values(sqlObject); 
      const sql = `INSERT INTO post_user_like (${columns}) VALUES (${placeholders})`;
      const [result] = await (await connection).execute(sql, values);
      return result;
    }
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; // Re-throw the error to handle it in the route handler
  } 
}



async function postUserComment(res,payload) {
  let connection = res.connection2;
  const {userId,person,comment} = payload;
  try {
    const sql1 = "SELECT * FROM user WHERE id = ?"
    const [rows, fields] = await (await connection).execute(sql1,[userId]);
    //console.log(rows);
    if(rows.length>0){
      const sqlObject = {user_id:userId, post_id:person,comments:comment};
      const columns = Object.keys(sqlObject).join(', '); 
      const placeholders = Object.keys(sqlObject).map(() => '?').join(', '); 
      const values = Object.values(sqlObject); 
      const sql = `INSERT INTO post_user_comment (${columns}) VALUES (${placeholders})`;
      const [result] = await (await connection).execute(sql, values);
      return result;
    }
  } 
  catch (error) {
    console.error('Error executing query:', error);
    throw error; // Re-throw the error to handle it in the route handler
  } 
}


  module.exports =  {postOnFb, postUserLike, postUserComment};
  


