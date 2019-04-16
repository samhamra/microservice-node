import React, { Component } from 'react';
import "./Login.css"
import { Redirect } from 'react-router-dom';
import {modelInstance} from "../../model.js"
export default class Login extends Component {
  
  componentDidMount() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      mode: "cors"
    })
    .catch(error => console.log(error))
 }
  render() {
    return (
      <p>Log out screen</p>
    )
  }
}