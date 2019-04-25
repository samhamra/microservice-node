import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {modelInstance} from "../model.js"

const Container = styled.div`
  width: 80%;
  @media (max-width: 700px) {
    width: 90%;
  }
  margin: auto;
  background: white;
  display: flex;
  flex-direction: columm;
  align-items: center;
  margin-bottom: 0.5em;
  padding-left: 0.8em;
  height: 1.8rem;
  opacity: 0.8;
  font-family: Lobster;
  
`
const Title = styled.h1`
  padding-top: 0.4em;
  font-size: 1.4rem;
`
const BlackLink = styled(Link)`
  color: black;
  :hover {
    color: black;
  }
`
const Arrow = styled.span`
  padding-left: 0.5em;
  padding-right: 0.5em;
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
    } else if(code===3) {
      this.setState({createTopic: modelInstance.getCreateTopic()})
    } else if(code===4) {
      this.setState({createPost: modelInstance.getCreatePost()})
    }
    
  }
  
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }
    
  render() {
    return (
      <Container>
        <Title>
        <BlackLink to={`/f`}>Forum</BlackLink> 
        {
          this.state.forumName && (
          <>
           <Arrow>&rarr;</Arrow>
           <BlackLink to={`/f/${this.state.forumId}`}>{this.state.forumName}</BlackLink>
           {
             this.state.createTopic && (
               <>
                <Arrow>&rarr;</Arrow> New topic 
              </>
             )
           }
           {
             this.state.topicName && (
            <>      
              <Arrow>&rarr;</Arrow>
             <BlackLink to={`/f/${this.state.forumId}/t/${this.state.topicId}`}>{this.state.topicName}</BlackLink>
             {
               this.state.createPost && (
                 <>
                  <Arrow>&rarr;</Arrow> New post 
                </>
               )
             }
            </>
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