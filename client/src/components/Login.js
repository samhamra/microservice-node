import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import {modelInstance} from "../model.js"
import styled from 'styled-components';
import {hostname} from '../config.js'

const Container = styled.div`
  margin: 2em 2em 2em 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const H2 = styled.h2`
  padding: .3em 0em;
  text-align: center;
  font-family: Lobster
`

const Input = styled.input`
  padding-left: 0.2em;
  margin-bottom: ${props => props.second ? "1.5em" : "0.5em"};
`

const Inner = styled.div`
  border: 1px solid black;
  background-color: rgba(255,255,255, 0.8);
  width: 226px;
  box-shadow: 4px 4px 20px 4px #000000;
`

const Button = styled.button`
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
  padding-top: 2em;
  font-family: Forum;
  text-align: center;
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
    let data = {username: e.target.elements[0].value, password: e.target.elements[1].value}
    fetch(`${hostname}/login`, {
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
        return <Redirect to={this.props.location.state ? this.props.location.state.prevPath : "/"}/>
    }
    return (
      <Container>
        <Inner>
          <H2>Login</H2>
          <Form onSubmit={this.login}>
            <Input required placeholder="Username"/>
            <Input second required type="password" placeholder="Password"/>
            <Button types="submit">Login</Button>
          </Form>
          <Error> {this.state.error}</Error>
        </Inner>
      </Container>
    )
  }
}