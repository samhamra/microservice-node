import React, { Component } from 'react';
import {modelInstance} from "../model.js"
import {Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(255,255,255, 1);
  width: 80%;
  margin: auto;
  @media (max-width: 700px) {
    width: 90%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.button`
  width: 20%;
  margin: auto;
  white-space: nowrap;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  font-family: Forum;
`
const Textarea = styled.textarea`
  padding-left: 1em;
  resize: none;
  height: 30vh;
  font-family: Forum;
`
export default class CreatePost extends Component {
  
  constructor(props) {
    super()
    this.state = {
      path: `/f/${props.match.params.forumId}/t/${props.match.params.topicId}`
    }
    this.sendData = this.sendData.bind(this)
  }
  sendData(e) {
    e.preventDefault()
    var data = {post: e.target.elements[0].value}
    fetch(`http://samhamra.com:3000${this.state.path}`, {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if(response.status === 200) {
        this.setState({redirect: true})
      } else {
        throw new Error("Something happened")
      }
    })
    .catch((error) =>  {
      this.setState({error: true})
    })
  }
  
  componentDidMount() {
    modelInstance.setCreatePost(true);
  }
  componentWillUnmount() {
    modelInstance.setCreatePost(false);
  }
  
  render() {
      if(this.state.redirect) {
        return <Redirect to={this.state.path}/>
      }
      
      
      if(!modelInstance.isLoggedIn() || this.state.error) {
        return <Redirect to="/"/>
      }
      return (
        <Container>
          <Form onSubmit={this.sendData}>
            <Textarea placeholder="Message" name="Post"/>
            <Button type="submit">Create post</Button>
          </Form>
        </Container>
      )
  }
}