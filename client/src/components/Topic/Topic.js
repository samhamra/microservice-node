import React, { Component } from 'react';
import {modelInstance} from "../../model.js"
import { Link, Redirect } from 'react-router-dom';

export default class Topic extends Component {
  
  constructor(props) {
    super()
    console.log(props.match.params)
    this.state = {
      
    }
  }
  componentDidMount() {
    fetch(`http://localhost:3000/f${this.props.match.params.forumId}/t${this.props.match.params.topicId}`, {
      mode: "cors",
      credentials: 'include'
    })
    .then(response => {
      if(response.status === 200) {
        return response.json()
      } else {
        throw new Error("something went wrong")
      }
    })
    .then(response => {
      this.setState({data: response})
    })
    .catch(error => {
      this.setState({error: error})
    })
  }
  render() {
    console.log(this.state.data)
    
    return (
      <div> 
      {this.state.data && (
        <div>
          <div style={{border: '1px solid black'}} >
            <h1>{this.state.data.title}</h1>
            <p>{this.state.data.post}</p>
            <p>{this.state.data.author}</p>
            <p>{this.state.data.timestamp}</p>
          </div>
          <div>
            {this.state.data.posts.map(post => (
              <div style={{border: '1px solid black'}} key={post.id}>
                <p>{post.post}</p>
                <p>{post.author}</p>
                <p>{post.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )
      }
      
      </div>
    )
  }
}