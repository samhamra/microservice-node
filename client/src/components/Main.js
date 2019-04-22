import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const RightTd = styled.td`
  border: 0.5px solid gray;
  width: 50%
  background: #e3e3e3;
`
const LeftTd = styled.td`
  border: 0.5px solid gray;
  width: 50%
  background: #eff0f1;
`

const Container = styled.div`
  padding: 2em;
`
const Table = styled.table`
  width: 75%;
`


const Outer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
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
      console.log(response);
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
            <Link to={"/f" + subForum.id}>{subForum.name}</Link>
            <div>
              Posts: {subForum.posts} Topics: {subForum.topics} 
            </div>
          </Outer>
        </LeftTd>
        <RightTd>
          <Outer>
            {subForum.latest.name &&
              <>
              <Link to={"/f" + subForum.id + "/t" + subForum.latest.id}>{subForum.latest.name}</Link>
              <div>
                By: {subForum.latest.user} at {subForum.latest.timestamp}
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
      </Container>
    )
  }
}