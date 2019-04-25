import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {modelInstance} from "../model.js"
import styled from 'styled-components';
import {hostname} from '../config.js'

const BlackLink = styled(Link)`
  color: black;
  :hover {
    color: black;
    font-weight: bold;
  }
`
const Tr= styled.tr`
  background-color: ${props => props.isEven ? "rgba(255,255,255, 0.8)" : "rgba(219,219,219, 0.8)"};
`
const HeaderRow = styled.tr`
  background-color: rgba(192,192,192, 1);
  padding-left: ${props => props.first ? "0.8em" : "0em"};
`
const Table = styled.table`
  width: 100%;
  font-family: Forum;
  color: black;
  font-size: 1.2rem;
`
const Th = styled.th`
  padding-left: ${props => props.first ? "0.8em" : "0em"};
`
const Container = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 700px) {
    width: 90%;
  }
`
const Button = styled.button`
  margin-top: 1em;
`

const Td = styled.td`
  border-bottom: 1px solid gray;
  height: 2vh;
  padding-left: ${props => props.first ? "0.8em" : "0em"};
`
const TBody = styled.tbody`
  border-top: 1px solid gray;
`
const THead = styled.thead`
  border-top: 1px solid black;
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
    fetch(`${hostname}/f/${this.props.match.params.forumId}`, {
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
          <Td first>
            <BlackLink key={topic.id} to={`/f/${this.props.match.params.forumId}/t/${topic.id}`}>{topic.title}</BlackLink>
          </Td>
          <Td>{topic.posts.length}</Td>
          <Td>{topic.views}</Td>
          <Td>
            By: {topic.posts[topic.posts.length-1].author} at {topic.posts[topic.posts.length-1].timestamp.substring(0,10)}
          </Td>
        </Tr>
    )})
    
    return (
      <Container> 
        <Table>
          <THead>
            <HeaderRow>
              <Th first>Topic</Th>
              <Th>Posts</Th>
              <Th>Views</Th>
              <Th>Latest post</Th>
            </HeaderRow>
          </THead>
          <TBody>
            {topics}
          </TBody>
        </Table>

        
        {
          this.state.isLoggedIn &&  
            <Link to={"/f/" + this.props.match.params.forumId + "/createTopic"}><Button>Create new topic</Button> </Link>
        } 
      </Container>
    )
  }
}