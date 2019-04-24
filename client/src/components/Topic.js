import React, { Component } from 'react';
import {modelInstance} from "../model.js"
import { Link} from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  background: white;
  width: 80%
`
const User = styled.div`
  width: 30%
`
const Avatar = styled.div`
  height: 60%
  background: green
`

const Data = styled.div`
  height: 40%
`

const Message = styled.div`
  padding: 0.5em;
`
const Username = styled.p`
  margin: 0;
  padding: 0;
`

const Post = styled.div`
  display: flex;
  border: 1px solid black;
  min-height: 15vw
`

export default class Topic extends Component {

  constructor(props) {
    super()
    console.log(props.match.params)
    this.state = {
      path: `/f/${props.match.params.forumId}/t/${props.match.params.topicId}`
    }
  }
  componentDidMount() {
    fetch("http://localhost:3000" + this.state.path, {
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
                  </Avatar>
                  <Data>
                    <Username>{post.author}</Username>
                    <Username>{post.timestamp}</Username>
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
              <Link to={this.state.path + "/createPost"}>Create new post </Link>
            }
            
          </div>
      </Container>
    )
  }
}