import React, { Component } from "react";
import { Container, Row, Col, /*Button*/ } from "react-bootstrap";
import "./Dashboard.css";

class Dashboard extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     email: "",
  //     password: ""
  //   };
  // }

  // validateForm() {
  //   return this.state.email.length > 0 && this.state.password.length > 0;
  // }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }

  // handleSubmit = event => {
  //   this.props.userHasAuthenticated(true);
  // }

  render() {
    return (
      <div className="Dashboard">
        <Container>
            <Row>
              <Col md="auto">
                Portfolio Component
              </Col>
            </Row>
            <Row>
              <Col md="auto">
                Groups Component
              </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
