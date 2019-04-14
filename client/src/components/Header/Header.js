import React, { Component } from 'react';
import './Header.css'
import Navbar from './Navbar'

export default class Header extends Component {
  render() {
    return (
      <div>
        <div>Sam´s forum! :D</div>
        <Navbar />
      </div>
    )
  }
}