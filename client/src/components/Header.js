import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color:white;
`
const Title = styled.h1`
  font-size: 10vw;
  font-family: Rez
`


export default class Header extends Component {
    
  render() {
    return (
      <Container className="applogo">
        <Title>Space Forum</Title>
      </Container>
    )
  }
}