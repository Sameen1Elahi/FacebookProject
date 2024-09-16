const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const { insertUser } = require('./models/insert_user.js');
const { loginUser } = require('./models/login_user.js');
const { addFriend } = require('./models/add_new_friend.js');
const { searchFriends } = require('./models/search_all_friends.js');
const { deleteFriend } = require('./models/delete_friend.js');
const { postOnFb } = require('./models/post_user_like.js');

// sign up user in databasr
app.post('/user', async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const result = await insertUser(name, password, email);
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

app.listen(3000,()=>{
    console.log("Listen to port 3000");
})