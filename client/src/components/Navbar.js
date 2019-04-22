import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {modelInstance} from "../model.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Sticky = styled.div`
position: -webkit-sticky;
position: sticky;
top: 0px;
background: black;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0 2em;
height: 2.5em;
color: white
`

const AccountName =  styled.p`
font-weight: bold;
display: inline;
margin: 0;
padding-right: 1em;
`


export default class Navbar extends Component {
  constructor(props) {
    super()
    modelInstance.addObserver(this);
    this.state= {
      userName: "",
      loggedIn: modelInstance.isLoggedIn()
    }
  }
  
  update() {
    this.setState({
      userName: modelInstance.getUserName(),
      loggedIn: modelInstance.isLoggedIn()
    })
  }
  
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <Sticky>
        <div>
          <Link to="/">Main</Link>
        </div>
        {this.state.loggedIn ? (
          <div>
            <FontAwesomeIcon icon={faUser} />
            <AccountName> {this.state.userName} </AccountName>
            <Link to="/logout"> Log out</Link>
          </div>
        ) : (
          <div>
            <Link to="/register">Sign up</Link> 
            <Link to="/login"> Log in</Link>
          </div>
        )}
      </Sticky>
    )
  }
}
