import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {modelInstance} from "../model.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import spaceman from '../spaceman.png'

const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: rgba(8,9,10, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2em;
  height: 2.5em;
  color: white
  z-index: 1;
`

const Nav = styled.nav`
  font-family: Lobster;
  font-size: 1.5em;
`

const Brand = styled.div`
  display: flex;
  align-items: center;
`

const AccountName =  styled.p`
  font-weight: bold;
  display: inline;
  margin: 0;
  padding-right: 1em;
  font-family: Courier;
`

const Img = styled.img`
  height: 2em;
  padding-right: 0.5em;
`

const Title = styled.div`
  font-family: Rez;
  font-size: 1.5em;
`

const WhiteLink = styled(Link)`
  color: white;
  :hover {
    color: white;
    text-decoration: none;
    text-shadow: 1px 1px white;
  }
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
  
  update(code) {
    if(code === 0 ) {
      this.setState({
        userName: modelInstance.getUserName(),
        loggedIn: modelInstance.isLoggedIn()
      })
    }
  }
  
  render() {
    return (
      <Sticky>
        <Brand>
          <div>
            <Img src={spaceman} />
          </div>
          <WhiteLink to="/">
            <Title>
              SpaceForum
            </Title>
          </WhiteLink>
        </Brand>
        {this.state.loggedIn ? (
          <Nav>
            <FontAwesomeIcon icon={faUser} />
            <AccountName> {this.state.userName} </AccountName>
            <Link to="/logout"> Log out</Link>
          </Nav>
        ) : (
          <Nav>
            <WhiteLink to="/register">Sign up </WhiteLink>
            <span>|</span> 
            <WhiteLink to="/login"> Login</WhiteLink>
          </Nav>
        )}
      </Sticky>
    )
  }
}
