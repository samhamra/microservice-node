import React, { Component } from 'react';
import './CreateTopic.css'
import {modelInstance} from "../../model.js"
import { Link, Redirect } from 'react-router-dom';

export default class CreateTopic extends Component {
  
  constructor(props) {
    super()
    this.state = {
      
    }
    this.sendData = this.sendData.bind(this);
  }
  sendData(e) {
    e.preventDefault()
    var data = {title: e.target.elements[0].value, post: e.target.elements[1].value}
    fetch(`http://localhost:3000/f${this.props.match.params.forumId}`, 
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    )
    .then(response => {
      console.log(response)
      if(response.status === 200) {
        return response.json()
      } else {
        throw new Error("Something happened")
      }
    })
    .then(response => {
      console.log(response)
      this.setState({redirect: response.path})
    })
    .catch((error) =>  {
      console.log(error)
      this.setState({error: true})
    })
  }
  
  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    }
    
    if(!modelInstance.isLoggedIn() || this.state.error) {
      return <Redirect to="/"/>
    }
    return (
      <div>
        <h1>Create a new topic</h1>
        <form onSubmit={this.sendData}>
          <input placeholder="Title" name="Title"/>
          <input placeholder="Message" name="Post"/>
          <button type="submit">Submit </button>
        </form>
      </div>
    )
  }
}