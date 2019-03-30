import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

import './NavBar.css';

class NavBar extends Component {
  handleLogout = async event => {
    this.userHasAuthenticated(false);
  }

  render() {
    return (
      <div className="NavBar">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Loquat</Navbar.Brand>
          <Navbar.Toggle aria-controls="nav navbar-nav" />
          {this.props.isAuthenticated
            ? <Navbar.Collapse id="nav navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="/about">About</Nav.Link>
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
      </div>
    );
  }
}

export default NavBar;
