import React, { Component } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import firebase from "../firebase.js"

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((UserCredential) => {            
            this.props.addUserCredential(UserCredential.user);
            this.props.history.push("/");
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({ isLoading: false });
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
  }

  render() {
    return (
      <div className="Login">
        <Container>
            <Form onSubmit={this.handleSubmit} bsPrefix="form">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </Form.Group>
                <Button 
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    variant="primary"
                >
                    {this.state.isLoading
                        ?  <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        : "Submit"
                    }
                </Button>
            </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
