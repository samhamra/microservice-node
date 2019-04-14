const express = require('express')
const bodyParser = require("body-parser"); 
const cors = require('cors')
const app = express()
const port = 1337

app.use(cors())
app.use(bodyParser.json());

var forumData = [{id: 0, name:"Family", topics: {}}, {id: 1, name:"Sports", topics: {}}]


app.get('/getAllSubForums', function(req, res) {
  res.send(forumData.map(a => {
    return {id: a.id, name: a.name}
  }))
});


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})