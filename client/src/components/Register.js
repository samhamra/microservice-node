import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

const Container = styled.form`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const Wrapper = styled.div`
  margin: 2em 2em 2em 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const Error= styled.p`
  color: red;
  font-weight: bold;
  padding-top: 2em
`



export default class Register extends Component {
  constructor(props) {
    super()
    this.state = {
    }
    this.register = this.register.bind(this)
  }

  
  register(e) {
    e.preventDefault();
    console.log("register")
    let data = {username: e.target.elements[0].value, password: e.target.elements[1].value}
    fetch("http://localhost:3000/register", {
        method: "POST",
        mode: "cors",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
      if(response.status === 200) {
        console.log("account created")
        this.setState({
          error: "",
          redirect: true
        })
      } else if(response.status === 409) {
        this.setState({
          error: "Username already exists",
          redirect: false
        })
      }
    })
    .catch(error => {
      this.setState({error: error})
    })
  }
  
  render() {
    if(this.state.redirect) {
      return <Redirect to="/login"/>
    }
    return (
      <Wrapper> 
        <h2>Register</h2>
        <Container onSubmit={this.register}>
          <input placeholder="Username"/>
          <input placeholder="Password"/>
          <button types="submit">Sign up</button>
        </Container>
        <Error> {this.state.error}</Error>
      </Wrapper>
    )
  }
}