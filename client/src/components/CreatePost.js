import React, { Component } from 'react';
import {modelInstance} from "../model.js"
import {Redirect } from 'react-router-dom';

export default class CreatePost extends Component {
  
  constructor(props) {
    super()
    this.state = {
      path: `/f/${props.match.params.forumId}/t/${props.match.params.topicId}`
    }
    this.sendData = this.sendData.bind(this)
  }
  sendData(e) {
    e.preventDefault()
    var data = {post: e.target.elements[0].value}
    fetch(`http://localhost:3000${this.state.path}`, {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if(response.status === 200) {
        this.setState({redirect: true})
      } else {
        throw new Error("Something happened")
      }
    })
    .catch((error) =>  {
      this.setState({error: true})
    })
  }
  
  render() {
      if(this.state.redirect) {
        return <Redirect to={this.state.path}/>
      }
      
      
      if(!modelInstance.isLoggedIn() || this.state.error) {
        return <Redirect to="/"/>
      }
      return (
        <div>
          <h1>Create a new post</h1>
          <form onSubmit={this.sendData}>
            <input placeholder="Message" name="Post"/>
            <button type="submit">Submit </button>
          </form>
        </div>
      )
  }
}