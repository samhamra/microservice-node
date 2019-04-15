const express = require('express')
const bodyParser = require("body-parser"); 
const cors = require('cors')
const session = require('express-session');
const app = express()
const port = 1337

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(cors())
app.use(bodyParser.json());


var forumData = [{id: 0, name:"Family", topics: [{title: "I love kids", post: "I really do", author: "Sam", timestamp: Date(), id: 0,  posts:[{post: "I agree", author:"Elin", id: 0, timestamp: Date()}] }]}, {id: 1, name:"Sports", topics: []}]

var userData= [];

var sess;
app.post('/register', function(req, res) {
  console.log(req.body)
  if(userData.some(user=> user.username === req.body.username)) {
    res.status(409).send("Username already exists")
  } else {
    userData.push(req.body)
    res.status(200).send("User created");
  }
})

app.post('/login', function(req, res) {
  sess = req.session;
  console.log(userData)
  console.log(req.body)
  if(userData.some(user=> user.username === req.body.username && user.password === req.body.password)) {
    console.log("logged in")
    sess.key = req.body.username
    console.log(sess);
    res.status(200).send({username: req.session.username})
  } else {
    console.log("bad credentials")
    res.status(401).send("Login unsuccessful")
  }
})

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        sess = {}
        res.status(200).send("logged out")
        
    });
  })

app.get('/getAllSubForums', function(req, res) {
  res.send(forumData.map(a => {
    return {id: a.id, name: a.name}
  }))
});

app.get('/f:subForumId', function(req, res) {
  res.send(forumData.filter(a => a.id == req.params.subForumId)[0])
})

app.post('/f:subForumId/createTopic', function(req, res) {
  req.session;
  console.log(sess)
  console.log(req)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})