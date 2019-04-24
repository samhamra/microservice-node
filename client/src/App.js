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
import NavigationPath from './components/NavigationPath'
import Topic from './components/Topic'
import Forum from './components/Forum'
import {Redirect, Route, BrowserRouter, Router } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
height: 100%;
width: 100%
`

const Background = styled.canvas`
position: fixed;
z-index: -1;
height: 100%;
width: 100%
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
      <Container>
        <Background id="sky"/>
        <BrowserRouter>
          <Route path="/" render={props=> (
            <>
              <Navbar/>
              <Header/>
            </>
          )}/>
          <Route exact path="/" render={props => (<Redirect to="/f"/>)}/>
          <Route path="/f" component={Forum}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          
        </BrowserRouter>
        
      </Container>
    );
  }
}

export default App;
