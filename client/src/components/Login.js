import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {modelInstance} from "../model.js"
import styled from 'styled-components';

const Container = styled.div`
  margin: 2em 2em 2em 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const H2 = styled.h2`
  padding: .3em 0em;
  text-align: center
`
const Inner = styled.div`
  background: white;
  width: 226px;

`
const Button = styled.button`
  margin-top: 1em;
`

const Form = styled.form`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
      <Container>
        <Inner>
          <H2>Login</H2>
          <Form onSubmit={this.login}>
            <input required placeholder="Username"/>
            <input required type="password" placeholder="Password"/>
            <Button types="submit">Login</Button>
          </Form>
          <Error> {this.state.error}</Error>
        </Inner>
      </Container>
    )
  }
}