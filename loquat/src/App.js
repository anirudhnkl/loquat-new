import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Routes from "./Routes";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }

  async componentDidMount() {
    try {
      // await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    // this.setState({ isAuthenticating: false });
  }  
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    this.userHasAuthenticated(false);
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Loquat</Navbar.Brand>
          <Navbar.Toggle aria-controls="nav navbar-nav" />
          {this.state.isAuthenticated
            ? <Navbar.Collapse id="nav navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="/Profile">Profile</Nav.Link>
                  <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            : <Navbar.Collapse id="nav navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="/about">About</Nav.Link>
                  <Nav.Link href="/login">Log-In</Nav.Link>
                </Nav>
                <Button variant="primary" href="/signup">Sign Up</Button>
              </Navbar.Collapse>
          }
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
