const express = require('express')
const path = require('path');
const bodyParser = require("body-parser"); 
const cors = require('cors')
const session = require('express-session');
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const app = express()
const port = 3001;
const TWO_HOURS = 1000 * 60 * 60 *2;
const whitelist= ["http://samhamra.com:8081", "http://www.samhamra.com:8081","http://forum.samhamra.com", "http://www.forum.samhamra.com" ,"http://localhost", "http://localhost:3001", "http://localhost:81", "http://samhamra.com" ];

var users = [];
fs.readFile('data/users.json', (err, data) => {
  if (err) throw err;
  users = JSON.parse(data);
});

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  (username, password, done) => {
    let idx = users.findIndex(user => username === user.username && password === user.password);
    if(idx !== -1) {
      return done(null, users[idx])
    } else {
      return done(null, false)
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  let user;
  if(id<users.length) {
    user = users[id]
  } else {
    user = false;
  }
  done(null, users[id]);
});


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
app.use(cors({credentials: true, origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    }
  }}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

var forum = []

fs.readFile('data/forum.json', (err, data) => {
  if (err) throw err;
  forum = JSON.parse(data);
});

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


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
  res.send(forum.map(a => {
    var lastTopic = {}
    if(a.topics.length > 0) {
      lastTopic = {
        id: a.topics[a.topics.length-1].id,
        name: a.topics[a.topics.length-1].title,
        user: a.topics[a.topics.length-1].posts[a.topics[a.topics.length-1].posts.length-1].author,
        timestamp: a.topics[a.topics.length-1].posts[a.topics[a.topics.length-1].posts.length-1].timestamp
      }
    }
    return {id: a.id, name: a.name, topics: a.topics.length, posts: a.topics.reduce((acc, curr) => ({x: acc.x+ curr.posts.length}), {x: 0}).x, latest: lastTopic}
  }))
});

app.get('/f/:forumId([0-9]+)', function(req, res) {
  res.send(forum[req.params.forumId])  
})


app.post('/f/:forumId([0-9]+)', function(req, res) {
  if(req.isAuthenticated()) {
    var currentForum = forum[req.params.forumId];
    currentForum.topics.push({title: req.body.title, author: req.user.username, timestamp: new Date(), id: currentForum.topics.length, views: 0, posts:[{id: 0, post: req.body.post, author: req.user.username, timestamp: new Date()}]})
    res.status(200).json({path: `/f/${currentForum.id}/t/${currentForum.topics.length-1}` })
  } else {
    res.sendStatus(401)
  }
})

app.get('/f/:forumId([0-9]+)/t/:topicId([0-9]+)', function(req, res) {
  var found = forum[req.params.forumId].topics.find(a => (a.id == req.params.topicId))

  if(found) {
    found.views++;
    res.send(found)
  } else {
    res.sendStatus(404)
  }
})

app.post('/f/:forumId([0-9]+)/t/:topicId([0-9]+)', function(req, res) {
  if(req.isAuthenticated()) {

    let currentIndex = forum[req.params.forumId].topics.findIndex(topic=>topic.id==req.params.topicId)
    let currentTopic = forum[req.params.forumId].topics[currentIndex]

    currentTopic.posts.push({post: req.body.post, author: req.user.username, timestamp: new Date(), id: currentTopic.posts.length})
    forum[req.params.forumId].topics = forum[req.params.forumId].topics.concat(forum[req.params.forumId].topics.splice(currentIndex, 1));
    res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }
})

app.post('/f/:forumId([0-9]+)/t/:topicId([0-9]+)/p/:postId([0-9]+)', function(req, res) {
  if(req.isAuthenticated()) {
    let currentTopic = forum[req.params.forumId].topics.find(topic=>topic.id==req.params.topicId);
    let currentPost = currentTopic.posts.find(post=>post.id == req.params.postId)
    if(currentPost.author === req.user.username) {
      currentPost.post = req.body.post;
      res.sendStatus(200);
    } else {
      res.sendStatus(401)
    }
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

process.stdin.resume();//so the program will not close instantly

function exitHandler() {
  console.log("shutting down")
  fs.writeFileSync('data/users.json', JSON.stringify(users));  
  fs.writeFileSync('data/forum.json', JSON.stringify(forum))
  process.exit();
}



//catches ctrl+c event
process.on('SIGINT', exitHandler);

module.exports = app;
