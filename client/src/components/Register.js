import React, { Component } from 'react';
import styled from 'styled-components';
import {Redirect } from 'react-router-dom';


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
      
      <Container>
        <Inner>
        <H2>Sign up</H2>
        <Form onSubmit={this.register}>
          <Input required placeholder="Username"/>
          <Input second required type="password" placeholder="Password"/>
          <Button types="submit">Sign up</Button>
        </Form>
        <Error> {this.state.error}</Error>
        </Inner>
      </Container>
    )
  }
}