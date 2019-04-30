import styled, { keyframes } from 'styled-components';
import React, { Component } from 'react';

const particle = keyframes`
from {
    left: -5%
    
}
to{
    left: 105%;
}
`


const Star = styled.div`
  z-index: 2;
  position:relative;
  width:1px;
  height:1px;
  top: 7rem;
  background-color:white;
  animation-name:${props => particle} 
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 5s;
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



export default class ShootingStar extends Component {
    constructor(props) {
      super()
    }
  render() {
    return (
        <Star/>
    )
  }
}