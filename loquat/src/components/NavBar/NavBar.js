import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav navbar-nav" />
        <Navbar.Collapse id="nav navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link href="#link">Log-In</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="nav nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Button variant="primary">Sign Up</Button>
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
}

export default NavBar;
