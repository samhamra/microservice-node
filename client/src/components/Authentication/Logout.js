import React, { Component } from 'react';
import "./Login.css"
import { Redirect } from 'react-router-dom';
import {modelInstance} from "../../model.js"

export default class Logout extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      mode: "cors",
      credentials: 'include'
    })
    .then(response => {
      modelInstance.setLogin(false, null)
    })
    .catch(error => console.log(error))
 }
  render() {
    return (
      <Redirect to="/"/>
    )
  }
}