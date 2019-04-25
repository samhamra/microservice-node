import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {modelInstance} from "../model.js"
import {hostname} from "../config.js"

export default class Logout extends Component {
  componentDidMount() {
    fetch(`http://${hostname}/logout`, {
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