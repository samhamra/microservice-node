import React, { Component } from 'react';
import "./Login.css"
import { Redirect } from 'react-router-dom';
import {modelInstance} from "../../model.js"
export default class Login extends Component {
  
  componentDidMount() {
    fetch("http://localhost:1337/logout", {
      method: "GET",
      mode: "cors"
    })
    .then(response => {
      if(response.statusText != "OK") {
        throw new Error('logout failed');
      } else {
        modelInstance.setLogin(false)
      }
    })
    .catch(error => console.log(error))
 }
  render() {
    return (
      <Redirect to="/"/>
    )
  }
}