const express = require('express')
const bodyParser = require("body-parser"); 
const cors = require('cors')
const session = require('express-session');
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express()
const port = 3000
const TWO_HOURS = 1000 * 60 * 60 *2;
//https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: TWO_HOURS
  }
}))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



var forumData = [{id: 0, name:"Family", topics: [{title: "I love kids", post: "I really do", author: "Sam", timestamp: Date(), id: 0,  posts:[{post: "I agree", author:"Elin", id: 0, timestamp: Date()}] }]}, {id: 1, name:"Sports", topics: []}]

var userData= [];



const users = [
  {id: '2f24vvg', email: 'test@test.com', password: 'password'}
]

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  (username, password, done) => {
    const user = users[0] 
    if(email === user.email && password === user.password) {
      console.log('Local strategy returned true')
      return done(null, user)
    }
  }
));
app.post('/register', function(req, res) {
  console.log(req.body)
  if(userData.some(user=> user.username === req.body.username)) {
    res.status(409).send("Username already exists")
  } else {
    userData.push(req.body)
    res.status(200).send("User created");
  }
  console.log("register");
  console.log(userData)
})

app.post('/login', function(req, res) {

  console.log(userData)
  console.log(req.body)
  if(userData.some(user=> user.username === req.body.username && user.password === req.body.password)) {
    console.log("logged in")
    req.session.key = "hej"
    res.send(200)
  } else {
    console.log("bad credentials")
    res.send(401)
  }
  console.log("login")
})

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.status(200).send("logged out")
        
    });
  })

app.get('/getAllSubForums', function(req, res) {
  console.log(req.sessionID)
  res.send(forumData.map(a => {
    return {id: a.id, name: a.name}
  }))
});

app.get('/f:subForumId', function(req, res) {
  res.send(forumData.filter(a => a.id == req.params.subForumId)[0])
})

app.post('/f:subForumId/createTopic', function(req, res) {

  console.log(req.session)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})