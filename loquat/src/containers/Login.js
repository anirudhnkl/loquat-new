import React, { Component } from "react";
import { Container, Button, Form } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.userHasAuthenticated(true);
  }

  render() {
    return (
      <div className="Login">
        <Container>
            <Form onSubmit={e => this.handleSubmit(e)} bsPrefix="form">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    {/* type="email" placeholder="Enter email" /> */}
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
                    {/* type="password" placeholder="Password" /> */}
                </Form.Group>
                <Button 
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    variant="primary"
                    href="/dashboard"
                >
                    Submit
                </Button>
            </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
