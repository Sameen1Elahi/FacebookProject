const express = require('express');
const app = express();
const connection = require('./models/connection.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const buildConnection = async (req, res, next) => {
    //console.log('fwefwe ', res);
    res.connection2 = connection;
    next();
}

app.use(buildConnection);

const { insertUser,loginUser } = require('./models/user.js');
const { addFriend,searchFriends,deleteFriend } = require('./models/friends.js');
const { postUserLike, postOnFb } = require('./models/posts.js');

// sign up user in databasr
app.post('/user', async (req, res) => {
    const { name, password, email } = req.body;
    try {
      //console.log('fwwfw ', connection);
      const result = await insertUser(res, { name, password, email });
      res.send(result);
    } catch (error) {
      res.status(500).send('Error inserting user');
    }
});

// login - already have account
app.post('/user/login', async (req,res)=>{
    const {name, password} = req.body;
    try{ 
        const result = await loginUser(name,password);
        res.send(result);
    } catch(error){
      res.status(500).send('Error login user');
    }
  })

// add new friend at the specific user id
app.post('/user/:id/friend', async (req,res)=>{
    const {id: userId} = req.params;
    const {friendUserId} = req.body;
    try{
        const result = await addFriend(userId,friendUserId);
        res.send(result);
    } catch(error){
        res.status(500).send('Error adding friends');
    }
});

app.get('/user/:id/friends',async(req,res)=>{
    const {id:userId} = req.params;
    try{
        const result = await searchFriends(userId);
        res.send(result);
    } catch(error){
        res.status(500).send('Error searching friends');
    }
});

// delete friend from specific user
app.put('/user/:id/delete-friend',async (req,res)=>{
    const {id: userId} = req.params;
    const {friendUserId} = req.body;
    try{
        const result = await deleteFriend(userId,friendUserId);
        res.send(result);
    } catch(error){
        res.status(500).send('Error searching friends');
    }
});

// post on fb
app.post('/user/:id/post',async(req,res)=>{
    const {id:userId} = req.params;
    const {image} = req.body;
    try{
        const result = await postOnFb(userId,image);
        res.send(result);
    } catch(error){
        res.status(500).send('Error searching friends');
    }
});

// like the post by another user
app.post('/post/:id/user-id/like',async (req,res)=>{
    const {id: userId} = req.params;
    const {person} = req.body;
    try{
        const result = await postUserLike(userId,person);
        res.send(result);
    } catch(error){
        res.status(500).send('Error searching friends');
    }
});

app.listen(3000,()=>{
    console.log("Listen to port 3000");
})