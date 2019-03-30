import React, { Component } from "react";
import { Container, Row, Col, /*Button*/ } from "react-bootstrap";
import Portfolio from "../components/Portfolio/Portfolio";
import GroupCards from "../components/GroupCards/GroupCards";

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
                <Portfolio />
              </Col>
            </Row>
            <Row>
              <Col md="auto">
                <GroupCards />
              </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
