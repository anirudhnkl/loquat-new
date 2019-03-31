import React, { Component } from "react";
import { Col, Container, Row, /*Button*/ } from "react-bootstrap";
import Portfolio from "../components/Portfolio/Portfolio";
import GroupCards from "../components/GroupCards/GroupCards";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      stocks: [],
      groups: []
    }
  }

  

  render() {
    return (
      <div className="Dashboard">
        <Container>
            <Row>
              <Col md="auto">
                <Portfolio {...this.props} stocks={this.state.stocks} />
              </Col>
            </Row>
            <Row>
              <Col md="auto">
                <GroupCards {...this.props} groups={this.state.groups} />
              </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
