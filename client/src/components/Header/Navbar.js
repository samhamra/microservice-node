import React, { Component } from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom';
import {modelInstance} from "../../model.js"
export default class Navbar extends Component {
  constructor(props) {
    super()
    modelInstance.addObserver(this);
    this.state= {
      userName: "",
      loggedIn: modelInstance.getLoggedIn()
    }
  }
  
  update() {
    this.setState({
      userName: modelInstance.getUserName(),
      loggedIn: modelInstance.getLoggedIn()
    })
  }
  
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        <div>
          <Link to="/">Main</Link>
        </div>
        {this.state.loggedIn ? (
          <div>
            <p>Username: {this.state.userName}</p>
            <Link to="/logout"> Log out</Link>
          </div>
        ) : (
          <div>
            <Link to="/register">Sign up</Link> 
            <Link to="/login"> Log in</Link>
          </div>
        )}
      </div>
    )
  }
}
