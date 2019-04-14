import React, { Component } from 'react';
import './Main.css'

import { Link } from 'react-router-dom';

export default class Main extends Component {
  constructor(props) {
    super()
    this.state = {
      subForums: []
    }
  }
  componentDidMount() {
    fetch('http://localhost:1337/getAllSubForums', {
      mode: "cors"
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({
        subForums: response
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    const subForums = this.state.subForums.map(subForum => (
      <li key={subForum.id}>{subForum.name}</li>
    ))
    return (
      <div>
        <ul>
          {subForums}
        </ul>
      </div>
    )
  }
}