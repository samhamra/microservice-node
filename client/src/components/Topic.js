import React, { Component } from 'react';
import {modelInstance} from "../model.js"
import { Link} from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar from '../avatar.png'

const Container = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 700px) {
    width: 90%;
  }
`
const User = styled.div`
  min-width: 20%;
  border-right: 1px solid black;
  text-align: center;  
`
const Button = styled.button`
  margin-left: 1em;
`

const Avatar = styled.div`
  height: 60%
  border-bottom: 1px solid black;
  font-size: 6vw;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    display: none;
  }
`

const Data = styled.div`
  height: 40%
`

const Message = styled.div`
  padding: 1em;
`
const Username = styled.p`
  font-weight: bold;
  margin: 0;
  padding: 0;
`
const Timestamp = styled.p`
  margin: 0;
  padding: 0;
`

const Post = styled.div`
  display: flex;
  border: 1px solid black;
  min-height: 15vw
  margin-bottom: 2vh;
  background: white;
  opacity: 0.8
  font-family: Forum
`

export default class Topic extends Component {

  constructor(props) {
    super()
    
    this.state = {
      path: `/f/${props.match.params.forumId}/t/${props.match.params.topicId}`
    }
    
  }
  componentDidMount() {
    fetch("http://samhamra.com:3000" + this.state.path, {
      mode: "cors",
      credentials: 'include'
    })
    .then(response => {
      if(response.status === 200) {
        return response.json()
      } else {
        throw new Error("something went wrong")
      }
    })
    .then(response => {
      modelInstance.setTopic(response.id, response.title)
      this.setState({data: response})
    })
    .catch(error => {
      this.setState({error: error})
    })
  }
  render() {
    if(this.state.error) {
      return (<p>Something happened, try again later</p>)
    }
    if(!this.state.data) {
      return null
    }
    return (
      <Container> 
          <div>
            {this.state.data.posts.map(post => (
              <Post key={post.id}>
                <User>
                  <Avatar>
                    <img src={avatar}/>
                  </Avatar>
                  <Data>
                    <Username>{post.author}</Username>
                    <Timestamp>{post.timestamp.substring(0,10)}</Timestamp>
                  </Data>
                </User>
                <Message>
                  <p>{post.post}</p>
                </Message>
              </Post>
            ))}
          </div>
          <div>
            {modelInstance.isLoggedIn() &&
              <Link to={this.state.path + "/createPost"}><Button>Create new post </Button></Link>
            }
            
          </div>
      </Container>
    )
  }
}