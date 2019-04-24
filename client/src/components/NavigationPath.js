import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {modelInstance} from "../model.js"

const Container = styled.div`
  width: 80%
  background: white
`
const Title = styled.h1`
  
`


export default class NavigationPath extends Component {
  constructor(props) {
    super()
    this.state = {
    }
    modelInstance.addObserver(this)
  }  
  
  update(code) {
    if(code===1) {
      let data = modelInstance.getForum();
      this.setState({forumId: data.forumId, forumName: data.forumName})
    } else if(code===2) {
      let data = modelInstance.getTopic();
      this.setState({topicId: data.topicId, topicName: data.topicName})
    }
  }
  
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }
    
  render() {
    console.log(this.state)
    return (
      <Container>
        <Title>
        <Link to={`/f`}>Forum</Link> 
        {
          this.state.forumName && (
          <>
           <Link to={`/f/${this.state.forumId}`}>{this.state.forumName}</Link>
           {
             this.state.topicName && (
             <Link to={`/f/${this.state.forumId}/t/${this.state.topicId}`}>{this.state.topicName}</Link>
             )
           }
          </>
          )
        }
        
        </Title>
      </Container>
    )
  }
}