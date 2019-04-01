import React, { Component } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Routes from "./Routes";
import firebase from "./firebase.js"
import logo from "./logo_text.png"

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      } 
    });
  }  

  addUserCredential = user => {
    this.setState({ user: user });
  }

  handleLogout = async event => {
    firebase.auth().signOut()
      .then(() => {
        this.setState({ user: null });
        this.props.history.push("/");
      })
  }

  render() {
    const childProps = {
      user: this.state.user,
      addUserCredential: this.addUserCredential
    };
    
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          {/* <Navbar.Brand href="/">Loquat</Navbar.Brand> */}
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="120"
              height="30"
              className="d-inline-block align-top"
              alt="Loquat"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav navbar-nav" />
          {this.state.user
            ? <Navbar.Collapse id="nav navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="/">Dashboard</Nav.Link>
                  <Nav.Link href={"/trade/" + this.state.user.uid}>Trade</Nav.Link>
                  <Nav.Link>Profile</Nav.Link>
                  <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            : <Navbar.Collapse id="nav navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link>About</Nav.Link>
                  <Nav.Link href="/login">Log-In</Nav.Link>
                </Nav>
                <Button variant="primary">Sign Up</Button>
              </Navbar.Collapse>
          }
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
