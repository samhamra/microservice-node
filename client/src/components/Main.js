import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import spaceman from '../spaceman.png'
import {modelInstance} from "../model.js"

const RightTd = styled.td`
  border: 0.5px solid #DBD7D6;
  width: 50%
  background: #e3e3e3;
`
const LeftTd = styled.td`
  border: 0.5px solid #DBD7D6;
  width: 50%
  background: #eff0f1;
`

const Info = styled.div`
  font-family: 'Forum', cursive;

`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 80%;
  @media (max-width: 700px) {
    width: 90%;
  }
`
const Table = styled.table`
  opacity: 0.8
  width: 100%;
`

const Wrapper = styled.div`
  width: 20%
  @media (max-width: 700px) {
    width: 10%;
  }
  display: flex;
  justify-content: center;
`

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`

const Img = styled.img`
  height: 15vw;
  position: sticky;
  top: 2em;
`
const BlackLink = styled(Link)`
  color: black;
  font-weight: bold;
  font-family: Forum;
  :hover {
    color: black;
  }
`


export default class Main extends Component {
  constructor(props) {
    super()
    this.state = {
      subForums: []
    }
  }
  componentDidMount() {
    fetch('http://207.154.242.193:3000/f', {
      mode: "cors",
      credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {
      modelInstance.setForum(null, null)
      modelInstance.setTopic(null, null)
      this.setState({
        subForums: response
      })
    })
    .catch(error => {
      this.setState({
        error: "Failed to fetch from server. Try again later!"
      })
    })
  }
  render() {
    if(this.state.error) {
      return <p>{this.state.error}</p>
    }
    const subForums = this.state.subForums.map(subForum => (
      
      <tr key={subForum.id}>
        <LeftTd>
          <Outer>
            <BlackLink to={"/f/" + subForum.id}>{subForum.name}</BlackLink>
            <Info>
              Posts: {subForum.posts} Topics: {subForum.topics} 
            </Info>
          </Outer>
        </LeftTd>
        <RightTd>
          <Outer>
            {subForum.latest.name &&
              <>
              <BlackLink onClick={()=> modelInstance.setForum(subForum.id, subForum.name)}  to={"/f/" + subForum.id + "/t/" + subForum.latest.id}>{subForum.latest.name}</BlackLink>
              <Info>
                By: {subForum.latest.user} at {subForum.latest.timestamp.substring(0,10)}
              </Info>
              </>
            }    
          </Outer>
        </RightTd>
      </tr>
    ))
      
    return (
      <Container>
        <Table>
          <tbody>
            {subForums}
          </tbody>
        </Table>

      </Container>
    )
  }
}