import React, { Component } from 'react';
import './App.css';
import Main from './components/Main/Main';
import Header from './components/Header/Header'

import { Route, BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route path="/" component={Header}/>
            <Route exact path="/" component={Main} />
      </BrowserRouter>
    );
  }
}

export default App;
