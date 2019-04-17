const express = require('express')
const bodyParser = require("body-parser"); 
const cors = require('cors')
const session = require('express-session');
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = []

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  (username, password, done) => {
    console.log(username, password)
    let idx = users.findIndex(user => username === user.username && password === user.password);
    if(idx !== -1) {
      console.log('Local strategy returned true')
      return done(null, users[idx])
    } else {
      console.log('Local strategy returned false')
      return done(null, false)
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  let user;
  if(id<users.length) {
    user = users[id]
  } else {
    user = false;
  }
  done(null, users[id]);
});

const app = express()
const port = 3000
const TWO_HOURS = 1000 * 60 * 60 *2;
//https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
app.use(session({
  genid: (req) => {
    return uuid()
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: TWO_HOURS
  }
}))
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


var forum = [
  {
    id: 0, 
    name:"Family", 
    topics: [{
      title: "I love kids", 
      post: "I really do",
      author: "Sam",
      timestamp: Date(),
      id: 0,
      posts:[{
        post: "I agree", 
        author:"Elin", 
        id: 0, 
        timestamp: Date()
      }] 
    }]
  },
  {
    id: 1,
    name:"Sports", 
    topics: []
  }
]


app.post('/register', function(req, res) {
  if(users.some(user=> user.username === req.body.username)) {
    res.send(409)
  } else {
    users.push({username: req.body.username, password: req.body.password, id: users.length})
    res.send(200);
  }
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { console.log(err); return next(err); }
    if (!user) { console.log("no user found"); return res.sendStatus(401) }
    req.login(user, (err) => {
      if (err) { console.log(err); return next(err); }
      console.log(user)
      console.log("authed")
      req.session.key = "sam"
      return res.status(200).send({username: user.username})
    })
  })(req, res, next);
})

app.post('/logout',(req,res) => {
  req.logout();
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    } 
  });
  res.end()
})

app.get('/f', function(req, res) {
  console.log(req.sessionID)
  res.send(forum.map(a => {
    return {id: a.id, name: a.name}
  }))
});

app.get('/f:forumId', function(req, res) {
  console.log(req.params.forumId)
  res.send(forum[req.params.forumId])  
})


app.post('/f:forumId', function(req, res) {
  console.log("create topic")
  console.log(req.user)
  console.log(`User authenticated? ${req.isAuthenticated()}`)
  if(req.isAuthenticated()) {
    console.log(req.params)
    var currentForum = forum[req.params.forumId];
    console.log(currentForum)
    currentForum.topics.push({title: req.body.title, post: req.body.post, author: req.user.username, timestamp: Date(), id: currentForum.topics.length, posts:[]})
    res.status(200).json({path: `/f${currentForum.id}/t${currentForum.topics.length-1}` })
  } else {
    res.sendStatus(401)
  }
})

app.get('/f:forumId/t:topicId', function(req, res) {
  res.send(forum[req.params.forumId].topics[req.params.topicId])
})

app.post('/f:forumId/t:topicId', function(req, res) {
  if(req.isAuthenticated()) {
    let currentTopic = forum[req.params.forumId].topics[req.params.topicId];
    currentTopic.posts.push({post: req.body.post, author: req.user.username, timestamp: Date(), id: currentTopic.posts.length})
    res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }
})



app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})