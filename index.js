const express = require('express');
const app = express();
const connection = require('./connection')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// search all friend 
app.get('/listFriends',(req,res)=>{
    connection.connect((error)=>{
      if(error) throw error;
      const sql = "SELECT * FROM friend";
      connection.query(sql,(error,result)=>{
        if(error) throw error;
      })
    })
  })

// Insert data: Add bew friend into table
app.post('/addNewFriend',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    connection.connect((error)=>{
      if(error) throw error;
      const sql ="INSERT INTO friend(id,name) VALUES (?,?)";
      connection.query(sql,[id,name],(error,result)=>{
        if(error) throw error;
      res.send(result);
      })
    })
  })


app.listen(3000,()=>{
    console.log("Listen to port 3000");
})