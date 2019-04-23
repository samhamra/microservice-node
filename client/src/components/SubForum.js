import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {modelInstance} from "../model.js"
import styled from 'styled-components';


const Tr= styled.tr`
  background: ${props => props.isEven ? "white" : "#DBD7D6"};
`
const Table = styled.table`
  width: 75%;
`
const Container = styled.div`
  padding: 2em;
  background: white;
`
const Td = styled.td`
  border-bottom: 1px solid gray;
`
const TBody = styled.tbody`
  border-top: 1px solid gray;
`

export default class SubForum extends Component {
  
  constructor(props) {
    super()
    this.state = {
      data: {topics: []},
      isLoggedIn: modelInstance.isLoggedIn()
    }
    modelInstance.addObserver(this)
  }
  componentDidMount() {
    fetch(`http://localhost:3000/f${this.props.match.params.id}`, {
      mode: "cors",
      credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({
        data: response
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }
  
  update() {
    this.setState({
      isLoggedIn: modelInstance.isLoggedIn()
    })
  }
  
  render() {
    const topics= this.state.data.topics.reverse().map((topic,i)=> {
      return (
        <Tr isEven={i%2 === 0} key={i}>
          <Td>
            <Link key={topic.id} to={`/f${this.props.match.params.id}/t${topic.id}`}>{topic.title}</Link>
          </Td>
          <Td>{topic.posts.length}</Td>
          <Td>{topic.views}</Td>
          <Td>
            By: {topic.posts[topic.posts.length-1].author} at {topic.posts[topic.posts.length-1].timestamp}
          </Td>
        </Tr>
    )})
    
    return (
      <Container> 
        <h1>{this.state.data.name}</h1>
        <Table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Posts</th>
              <th>Views</th>
              <th>Latest post</th>
            </tr>
          </thead>
          <TBody>
            {topics}
          </TBody>
        </Table>

        
        {
          this.state.isLoggedIn &&  
            <Link to={"/f" + this.props.match.params.id + "/createTopic"}>Create new topic </Link>
        }
        <Link to="/">Go back to main</Link>
      </Container>
    )
  }
}