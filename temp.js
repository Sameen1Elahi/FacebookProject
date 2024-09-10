const connection = require('./connection')
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/register.html');
});

app.post('/',(req,res)=>{
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const mobileNo = req.body.mobileNo;


  // Insert data into table 
  connection.connect((error)=>{
    if(error) throw error;
    const sql ="INSERT INTO student(id,name,email,mobileNo) VALUES (?,?,?,?)";
    connection.query(sql,[id,name,email,mobileNo],(error,result)=>{
      if(error) throw error;
      // const name = "myname "+ name,
      // const name = `my name is ${name}`;
      //res.send("Student Register successful " + result.insertId);
      res.redirect("/students");
    })
  })
})

// display data 
app.get('/students',(req,res)=>{
  connection.connect((error)=>{
    if(error) throw error;
    const sql = "SELECT * FROM student";
    connection.query(sql,(error,result)=>{
      if(error) throw error;

      res.render(__dirname+"/students",{students:result});
    })
  })
})

// Delete data from table
app.get('/delete-student',(req,res)=>{
  connection.connect((error)=>{
    if(error) throw error;
    const sql = "delete from student where id=?";
    connection.query(sql,[req.query.id],(error,result)=>{
      if(error) throw error;
      res.redirect('/students');
    })
  })
})

//update student 
app.get('/update-student',(req,res)=>{
  connection.connect((error)=>{
    if(error) throw error;
    const sql = "select * from student where id=?";
    connection.query(sql,[req.query.id],(error,result)=>{
      if(error) throw error;
      res.render(__dirname+'/update-student', {student:result});
    })
  })
})
app.post('/update-student',(req,res)=>{
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  let mobileNo = req.body.mobileNo;
  connection.connect(async(error)=>{
    if(error) throw error;
    const sql = "update student set name=?, email=?, mobileNo=? where id=?";
    try {
       const res = await connection.query(sql,[name, email, mobileNo, id]);
      // res
       
    } catch(err) {
      throw err;
    }
    // connection.query(sql,[name, email, mobileNo, id],(error,result)=>{
    //   if(error) throw error;
    //   res.redirect('/students');
    // })
  })
})



app.listen(3000,()=>{
  console.log("Listen to port 3000");
})