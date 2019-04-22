import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {modelInstance} from "../model.js"
import styled from 'styled-components';


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

export default class Login extends Component {
  constructor(props) {
    super()
    this.state= {
      error: "",
      redirect: false
    }
    this.login = this.login.bind(this)
  }
  
  login(e) {
    e.preventDefault();
    console.log("login")
    let data = {username: e.target.elements[0].value, password: e.target.elements[1].value}
    fetch("http://localhost:3000/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
      if(response.status === 200) {
        return response.json()
      } else if(response.status === 401) {
        throw new Error("error")
      }
     })
    .then(response=> {
      modelInstance.setLogin(true, response.username);
      this.setState({
        redirect: true
      })
    })
    .catch(error => {
      this.setState({
        error: "Wrong username or password"
      })
    })
  }
  render() {
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }
    return (
      <Wrapper>
        <h2>Login</h2>
        <Container onSubmit={this.login}>
          <input placeholder="Username"/>
          <input placeholder="Password"/>
          <button types="submit">Sign up</button>
        </Container>
        <Error> {this.state.error}</Error>
      </Wrapper>
    )
  }
}