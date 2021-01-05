import React, { Component } from 'react';
import styled from 'styled-components';
import NavigationPath from './NavigationPath'
import Topic from './Topic'
import Main from './Main'
import SubForum from './SubForum'
import CreatePost from './CreatePost'
import CreateTopic from './CreateTopic'
import EditPost from './EditPost'
import {Route} from 'react-router-dom';

const Container = styled.div`
`
export default class Forum extends Component {
    
  render() {
    return (
      <Container>
        <NavigationPath/>
        <Route exact path="/f" component={Main} />
        <Route exact path="/f/:forumId([0-9]+)" component={SubForum}/>
        <Route exact path="/f/:forumId([0-9]+)/createTopic" component={CreateTopic}/>
        <Route exact path="/f/:forumId([0-9]+)/t/:topicId([0-9]+)" component={Topic}/>
        <Route exact path="/f/:forumId([0-9]+)/t/:topicId([0-9]+)/createPost" component={CreatePost}/>
        <Route exact path="/f/:forumId([0-9]+)/t/:topicId([0-9]+)/p/:postId([0-9]+)/editPost" component={EditPost}/>
      </Container>
    )
  }
}
