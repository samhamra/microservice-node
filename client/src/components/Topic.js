import React, { Component } from 'react';
import {modelInstance} from "../model.js"
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import avatar from '../avatar.png'
import {hostname} from '../config.js'

const Container = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 700px) {
    width: 90%;
  }
`
const User = styled.div`
  min-width: 20%;
  max-width: 20%;
  border-right: 1px solid black;
  text-align: center;  
`
const Button = styled.button`
`
const Avatar = styled.div`
  max-height: 60%;
  height: 60%;
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


const Img = styled.img`
  width: 50%;
`

const Data = styled.div`
  height: 40%
`

const WhiteLink = styled(Link)`
  background: rgba(255,255,255, 1);
  margin: 0.6em;
`

const Message = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justfiy-content: space-between;
`
const Text = styled.div`
padding: 0.6em;
`
const Buttons = styled.div`
display: flex;
justify-content: flex-end;
align-items: flex-end;
height: 100%;
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
  background: rgba(255,255,255, 0.8);
  font-family: Forum
  font-size: 1.2rem;
`

export default class Topic extends Component {

  constructor(props) {
    super()
    this.state = {
      path: `/f/${props.match.params.forumId}/t/${props.match.params.topicId}`,
    }
  }
  componentDidMount() {
    fetch(hostname + this.state.path, {
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
      return (<h2 style={{color:"white"}}>Something happened, try again later</h2>)
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
                    <Img src={avatar} alt="avatar"/>
                  </Avatar>
                  <Data>
                    <Username>{post.author}</Username>
                    <Timestamp>{post.timestamp.substring(0,10)}</Timestamp>
                  </Data>
                </User>
                <Message>
                  <Text>
                      <p>{post.post}</p>
                  </Text>
                  <Buttons>
                  {modelInstance.getUserName() === post.author && (
                    <WhiteLink to={{pathname:`${this.state.path}/p/${post.id}/editPost`, state: {message: post.post}}}>
                      <button>Edit post</button>
                    </WhiteLink>
                  )}
                  </Buttons>                  
                </Message>
              </Post>
            ))}
          </div>
          <div>
            {
              modelInstance.isLoggedIn() ? (
                <Link to={this.state.path + "/createPost"}>
                  <Button>Create new post</Button>
                </Link>
              ) : (
                <Link to={{pathname: "/login", state:{prevPath: this.props.location.pathname }}}>
                  <Button>Create new post</Button>
                </Link>
              )
            }
          </div>
      </Container>
    )
  }
}
