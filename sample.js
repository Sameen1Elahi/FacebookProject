// convert functions into async await
const express = require('express');
const app = express();
const connection = require('./connection')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// sign up - add the user
app.post('/user', async (req, res) => {
    const { name, password, email } = req.body;
    // Wrapping the database query into a Promise
    const insertUser = () => {
      return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user SET ?';
        const obj = {name, password, email};
        console.log(obj);
        connection.query(sql, obj, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    };
    try {
      // Await the connection to the database
      await new Promise((resolve, reject) => {
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      // Await the result from insertUser
      const result = await insertUser();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    } 
  });
  



// login - already have account
app.post('/user/login',async (req,res)=>{
  const {name, password} = req.body;
  const loginUser = () =>{
    return new Promise((resolve, reject)=>{
        const sql = 'SELECT * FROM user WHERE name = ? AND password = ?'
        connection.query(sql, [name,password],(error,result)=>{
            if(error){
                reject(error)
            } else{
                resolve(result)
            }
        })
    })
  }
  try{
    await new Promise((resolve,reject)=>{
        connection.connect((error)=>{
            if(error){
                reject(error)
            } else{
                resolve()
            }
        })
    })
    const result = await loginUser();
    res.send(result);
  }
  catch(error){
    res.status(500).send(error.message);
  } 
})




// add new friend at the specific user id
app.post('/user/:id/friend', async (req, res) => {
    const {id:userId} = req.params;
    const {friendUserId} = req.body;
    // Wrapping the database query into a Promise
    const addNewFriend = () => {
      return new Promise((resolve, reject) => {
        const sql ="INSERT INTO friend SET ?";
        const obj = {userId, friendUserId};
        console.log(obj);
        connection.query(sql, obj, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    };
    try {
      // Await the connection to the database
      await new Promise((resolve, reject) => {
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      // Await the result from addNewFriend
      const result = await addNewFriend();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });



// search all friends from the specific user id
app.get('/user/:id/friends', async (req, res) => {
    const {id: userId} = req.params;
    // Wrapping the database query into a Promise
    const searchAllFriends = () => {
      return new Promise((resolve, reject) => {
        const sql ="SELECT * FROM user u JOIN friend f ON f.friend_user_id = u.id WHERE f.user_id = ? AND f.deleted_at IS NULL";
        connection.query(sql,[userId], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    };
    try {
      // Await the connection to the database
      await new Promise((resolve, reject) => {
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      // Await the result from searchAllFriends
      const result = await searchAllFriends();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


// delete friend from specific user
app.put('/user/:id/delete-friend', async (req, res) => {
    const {id: userId} = req.params;
    const {friendUserId} = req.body;
    // Wrapping the database query into a Promise
    const deleteFriend = () => {
      return new Promise((resolve, reject) => {
        const sql = "UPDATE friend SET deleted_at = NOW() WHERE user_id = ? AND friend_user_id = ?";
        connection.query(sql, [userId, friendUserId], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    };
    try {
      // Await the connection to the database
      await new Promise((resolve, reject) => {
        connection.connect((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      // Await the result from deleteFriend
      const result = await deleteFriend();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
});



app.listen(3000,()=>{
    console.log("Listen to port 3000");
})