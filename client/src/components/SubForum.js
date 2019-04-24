import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {modelInstance} from "../model.js"
import styled from 'styled-components';

const BlackLink = styled(Link)`
  color: black;
  :hover {
    color: black;
  }
`
const Tr= styled.tr`
  background: ${props => props.isEven ? "white" : "#DBD7D6"};
`
const Table = styled.table`
  width: 100%
`
const Container = styled.div`
  background: white;
  width: 80%
`
const Td = styled.td`
  border-bottom: 1px solid gray;
  height: 3em;
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
    fetch(`http://localhost:3000/f/${this.props.match.params.forumId}`, {
      mode: "cors",
      credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {
      modelInstance.setForum(response.id, response.name)
      modelInstance.setTopic(null, null)
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
  
  update(code) {
    this.setState({
      isLoggedIn: modelInstance.isLoggedIn()
    })
  }
  
  render() {
    const topics= this.state.data.topics.reverse().map((topic,i)=> {
      return (
        <Tr isEven={i%2 === 0} key={i}>
          <Td>
            <BlackLink key={topic.id} to={`/f/${this.props.match.params.forumId}/t/${topic.id}`}>{topic.title}</BlackLink>
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
            <Link to={"/f/" + this.props.match.params.forumId + "/createTopic"}>Create new topic </Link>
        }
        <Link to="/">Go back to main</Link>
      </Container>
    )
  }
}