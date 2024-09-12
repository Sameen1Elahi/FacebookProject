const express = require('express');
const app = express();
const connection = require('./connection')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// sign up - add the user
app.post('/user',(req,res)=>{
  const {name, password, email} = req.body;
  console.log(name, password, email);
  connection.connect((error)=>{
    if(error) throw error;
    const sql = 'INSERT INTO user SET ?';
    const sqlObject = {name, password, email};
    connection.query(sql,sqlObject,(error,result)=>{
      if(error) throw error;
    res.send(result);
    })
  })
  connection.end();
})

// login - already have account
app.post('/user/login',(req,res)=>{
  const {name, password} = req.body;
  connection.connect((error)=>{
    if(error) throw error;
    const sql = 'SELECT * FROM user WHERE name = ? AND password = ?'
    const sqlObject = [name, password];
    connection.query(sql, sqlObject,(error,result)=>{
      if (error) throw error;
    res.send(result);
    })
  })
  connection.end();
})

// add new friend at the specific user id
app.post('/user/:id/friend',(req,res)=>{
  const {id: userId} = req.params;
  const {friendUserId} = req.body;
  connection.connect((error)=>{
    if(error) throw error;
    const sql ="INSERT INTO friend SET ?";
    const sqlObject = [userId, friendUserId];
    connection.query(sql, [userId, friendUserId] ,(error,result)=>{
      if(error) throw error;
    res.send(result);
    })
  })
  connection.end();
})

// search all friends from the specific user id
app.get('/user/:id/friends',(req,res)=>{
  const {id:userId} = req.params;
  connection.connect((error)=>{
    if(error) throw error;
    const sql = "SELECT * FROM user u JOIN friend f ON f.friend_user_id = u.id WHERE f.user_id = ?";
    const sqlObject = [userId];
    connection.query(sql,sqlObject,(error,result)=>{
      if(error) throw error;
    res.send(result);
    })
  })
  connection.end();
})


// delete friend from specific user
app.put('/user/:id/delete-friend',(req,res)=>{
  const {id: userId} = req.params;
  const {friendUserId} = req.body;
  connection.connect((error)=>{
    if(error) throw error;
    const sql = "UPDATE friend SET deleted_at = NOW() WHERE user_id = ? AND friend_user_id = ?"
    const sqlObject = [userId, friendUserId];
    connection.query(sql,sqlObject,(error,result)=>{
      if(error) throw error;
    res.send(result);
    })
  })
  connection.end();
})



app.listen(3000,()=>{
    console.log("Listen to port 3000");
})