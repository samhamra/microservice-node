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

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const Table = styled.table`
  width: 80%;
`

const Wrapper = styled.div`
  width: 20%
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
    fetch('http://localhost:3000/f', {
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
            <div>
              Posts: {subForum.posts} Topics: {subForum.topics} 
            </div>
          </Outer>
        </LeftTd>
        <RightTd>
          <Outer>
            {subForum.latest.name &&
              <>
              <BlackLink to={"/f/" + subForum.id + "/t/" + subForum.latest.id}>{subForum.latest.name}</BlackLink>
              <div>
                By: {subForum.latest.user} at {subForum.latest.timestamp.substring(0,10)}
              </div>
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
        <Wrapper>
          <Img src={spaceman} />
        </Wrapper>
      </Container>
    )
  }
}