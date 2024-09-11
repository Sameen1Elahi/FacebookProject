const express = require('express');
const app = express();
const connection = require('./connection')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// sign up - add the user
app.post('/User/signUp',(req,res)=>{
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  connection.connect((error)=>{
    if(error) throw error;
    const sql = 'INSERT INTO user(name,password,email) VALUES(?,?,?)';
    connection.query(sql,[name,password,email],(error,result)=>{
      if(error) throw error;
    res.send(result);
    })
  })
})

// login - already have account
app.post('/User/login',(req,res)=>{
  const name = req.body.name;
  const password = req.body.password;
  connection.connect((error)=>{
    if(error) throw error;
    const sql = 'SELECT * FROM user WHERE name = ? AND password = ?'
    connection.query(sql, [name,password],(error,result)=>{
      if (error) throw error;
    res.send(result);
    })
  })
})

// add new friend at the specific user id
app.post('/user/:id/friend',(req,res)=>{
  const {id: userId} = req.params;
  //console.log(userId);
  const friendUserId = req.body.friendUserId;
  connection.connect((error)=>{
    if(error) throw error;
    const sql ="INSERT INTO friend(user_id, friend_user_id) VALUES (?,?)";
    connection.query(sql,[userId, friendUserId],(error,result)=>{
      if(error) throw error;
    res.send(result);
    })
  })
})

// search all friends from the specific user id
app.get('/user/:id/allFriends',(req,res)=>{
  const {id:userId} = req.params;
  connection.connect((error)=>{
    if(error) throw error;
    const sql = "SELECT * FROM friend LEFT JOIN user ON friend.friend_user_id = user.id WHERE friend.user_id = ?";
    connection.query(sql,[userId],(error,result)=>{
      if(error) throw error;
    res.send(result);
    })
  })
})


// delete friend from specific user
app.put('/user/:id/deleteFriend',(req,res)=>{
  const {id: userId} = req.params;
  const friendUserId = req.body.friendUserId;
  connection.connect((error)=>{
    if(error) throw error;
    const sql = "UPDATE friend SET deleted_at = NOW() WHERE user_id = ? AND friend_user_id = ?"
    connection.query(sql,[userId, friendUserId],(error,result)=>{
      if(error) throw error;
    res.send(result);
    })
  })
})



app.listen(3000,()=>{
    console.log("Listen to port 3000");
})