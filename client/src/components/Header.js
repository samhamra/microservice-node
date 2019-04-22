import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgray
`


const Title = styled.h1`
  font-size: 10vw;
`


export default class Header extends Component {
  render() {
    return (
      <Container>
        <Title>Sams forum</Title>
      </Container>
    )
  }
}