import React, { Component } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import Portfolio from "../components/Portfolio/Portfolio";
import GroupCards from "../components/GroupCards/GroupCards";
import Recommendations from "../components/Recommendations/Recommendations";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isLoading: true,
      stocks: [],
      groups: [],
      recs: []
    }
  }

  componentDidMount() {
    axios.get('https://loquat.appspot.com/user/portfolio/' + this.props.user.uid)
      .then((response) => {
        var stocks = []
        for (let stock in response.data) {
          let data = JSON.parse(response.data[stock]);
          stocks.push({id: stock, ...data});
        }
        this.setState({ stocks: stocks });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });

    axios.get('https://loquat.appspot.com/user/groups/' + this.props.user.uid)
      .then((response) => {
        var groups = []
        for (let group in response.data) {
          let data = JSON.parse(response.data[group]);
          groups.push({id: group, ...data});
        }
        this.setState({ groups: groups });
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get('https://loquat.appspot.com/recommend/' + this.props.user.uid)
      .then((response) => {
        var recs = []
        for (let rec in response.data) {
          let data = JSON.parse(response.data[rec]);
          recs.push({id: rec, ...data});
        }
        this.setState({ 
          isLoading: false,
          recs: recs
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (this.state.isLoading ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      : <div className="Dashboard">
          <Container>
            <Row>
              <Col md="5">
                <Portfolio {...this.props} stocks={this.state.stocks} />
                <Recommendations {...this.props} recs={this.state.recs}  />
              </Col>
              <Col md="7">
                <GroupCards {...this.props} groups={this.state.groups} />
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

export default Dashboard;
