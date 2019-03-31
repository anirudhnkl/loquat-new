import React, { Component } from "react";
import { Col, Container, Row, /*Button*/ } from "react-bootstrap";
import axios from "axios";
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
      .catch(function (error) {
        console.log(error);
      });

    // axios.get('https://loquat.appspot.com/user/groups/' + this.props.user.uid)
    //   .then((response) => {
    //     var stocks = []
    //     for (let stock in response.data) {
    //       let data = JSON.parse(response.data[stock]);
    //       stocks.push({id: stock, ...data});
    //     }
    //     this.setState({ stocks: stocks });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <div className="Dashboard">
        <Container>
            <Row>
              <Col md="5">
                <Portfolio {...this.props} stocks={this.state.stocks} />
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
