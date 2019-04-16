import React, { Component } from 'react';
import "./Register.css"
import { Link, Redirect } from 'react-router-dom';

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
      //Handle network error
      console.log(error); console.log("error caught")
    })
  }
  
  render() {
    if(this.state.redirect) {
      return <Redirect to="/login"/>
    }
    return (
      <div> 
        <form onSubmit={this.register}>
          <input placeholder="Username"/>
          <input placeholder="Password"/>
          <button type="submit">Sign up</button>
        </form>
        <p> {this.state.error}</p>
      </div>
    )
  }
}