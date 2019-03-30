import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar'

// import logo from './logo.svg';
// import background from './background.jpg'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Jumbotron bsPrefix='jumbotron' fluid>
          <h1>Loquat</h1>
          <h4>
            Social Investing Made Easy
          </h4>
          <br />
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
