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

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
