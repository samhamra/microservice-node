import React, { Component } from 'react';
import {modelInstance} from "../model.js"
import {Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 700px) {
    width: 90%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255,255,255, 1);
  font-family: Forum;
`
const Button = styled.button`
  width: 20%;
  margin: auto;
  white-space: nowrap
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  font-family: Forum;
  font-size: 1.2rem;
`
const Input = styled.input`
  padding-left: 1em;
  font-family: Forum;
`
const Textarea = styled.textarea`
  padding-left: 1em;
  resize: none;
  height: 30vh;
  font-family: Forum;
`

export default class CreateTopic extends Component {
  
  constructor(props) {
    super()
    this.state = {
      
    }
    this.sendData = this.sendData.bind(this);
  }
  
  componentDidMount() {
    modelInstance.setCreateTopic(true);
  }
  componentWillUnmount() {
    modelInstance.setCreateTopic(false);
  }
  sendData(e) {
    e.preventDefault()
    var data = {title: e.target.elements[0].value, post: e.target.elements[1].value}
    fetch(`/f/${this.props.match.params.forumId}`, 
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    )
    .then(response => {
      console.log(response)
      if(response.status === 200) {
        return response.json()
      } else {
        throw new Error("Something happened")
      }
    })
    .then(response => {
      console.log(response)
      this.setState({redirect: response.path})
    })
    .catch((error) =>  {
      console.log(error)
      this.setState({error: true})
    })
  }
  
  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    }
    
    if(!modelInstance.isLoggedIn() || this.state.error) {
      return <Redirect to="/"/>
    }
    return (
      <Container>
        <Form onSubmit={this.sendData}>
          <Input required placeholder="Title" name="Title"/>
          <Textarea required placeholder="Message" name="Post"/>
          <Button type="submit">Create topic </Button>
        </Form>
      </Container>
    )
  }
}