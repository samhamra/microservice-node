import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color:white;
  max-width: 100%;
  width: 100vw;
  overflow: hidden;
  position: relative;
`
const Title = styled.h1`
  font-size: 10vw;
  font-family: Rez
`

const particle = keyframes`
0% {
  left: -100px  
}
60% {
  left: calc( 100% + 100px );
}
100% {
  left: calc( 100% + 100px );
}
`

const Star = styled.div`
  z-index: 2;
  position:absolute;
  width:1px;
  height:1px;
  left: -5px;
  background-color:white;
  animation-name:${props => particle} 
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 10s;
  ::before{
    position:absolute;
    display:block;
    content:"";
    width:100px;
    right:1px;
    top:0px;
    height:1px;
    background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(255,255,255,0.4) 100%); 
  }
}
`

export default class Header extends Component {
    
  render() {
    return (
      <Container className="applogo">
        <Title>SpaceForum</Title>
        <Star/>
      </Container>
    )
  }
}

