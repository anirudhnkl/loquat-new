import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Jumbotron bsPrefix='jumbotron' fluid>
          <h1>Social Investing Made Easy</h1>
          <p>
            Form investment clubs with friends within 5 minutes. 
          </p>
          <br />
          <p>
            <Button variant="primary">Sign Up</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;