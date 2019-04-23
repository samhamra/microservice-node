import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header'
import Navbar from './components/Navbar'
import SubForum from './components/SubForum'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateTopic from './components/CreateTopic'
import CreatePost from './components/CreatePost'
import Topic from './components/Topic'
import { Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

const Background = styled.canvas`
position: fixed;
z-index: -1
`

class App extends Component {
  
  componentDidMount() {
    var c = document.getElementById('sky');
  	var ctx = c.getContext('2d');
  	var xMax = c.width = window.screen.availWidth;
  	var yMax = c.height = window.screen.availHeight;
  	var hmTimes = Math.round(xMax + yMax);	
  	
  	for(var i=0; i<=hmTimes; i++) {
  	  var randomX = Math.floor((Math.random()*xMax)+1);
  	  var randomY = Math.floor((Math.random()*yMax)+1);
  	  var randomSize = Math.floor((Math.random()*2)+1);
  	  var randomOpacityOne = Math.floor((Math.random()*9)+1);
  	  var randomOpacityTwo = Math.floor((Math.random()*9)+1);
  	  var randomHue = Math.floor((Math.random()*360)+1);
      if(randomSize>1) {
        ctx.shadowBlur = Math.floor((Math.random()*15)+5);
        ctx.shadowColor = "white";
  	  }
      ctx.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
  	  ctx.fillRect(randomX, randomY, randomSize, randomSize);
  	}
  
  }
  render() {
    return (
      <div>
        <Background id="sky"/>
        <BrowserRouter>
          <Route path="/" component={Navbar}/>
          <Route path="/" component={Header}/>
          <Route exact path="/" component={Main} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact path="/f:id" component={SubForum}/>
          <Route exact path="/f:forumId/createTopic" component={CreateTopic}/>
          <Route exact path="/f:forumId/t:topicId" component={Topic}/>
          <Route exact path="/f:forumId/t:topicId/createPost" component={CreatePost}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
