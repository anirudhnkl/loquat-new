import React, { Component } from "react";
import { Button, ButtonToolbar, Col, Container, Row, /*Button*/ } from "react-bootstrap";
import axios from "axios";
import Portfolio from "../components/Portfolio/Portfolio";
import Members from "../components/Members/Members";

import "./Group.css";

class Group extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      amount: null,
      stocks: [],
      members: []
      // pending_trades: []
    }
  }

  componentDidMount() {
    axios.get('https://loquat.appspot.com/groups/portfolio/' + this.props.groupId)
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

    axios.get('https://loquat.appspot.com/groups/members/' + this.props.groupId)
      .then((response) => {
        var amount = null
        var members = []
        for (let member in response.data) {
          let data = JSON.parse(response.data[member]);
          if (member === 0)
            amount = data
          else
            members.push({id: member, ...data});
        }
        this.setState({ 
          amount: amount,
          members: members
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
    <div className="Group">
      <Container>
        <Row>
          <h1>Group: {this.props.groupId}</h1>
        </Row>
        <Row>
          <Col md="5">
            <Portfolio {...this.props} stocks={this.state.stocks} />
          </Col>
          <Col md="7">
            <Members {...this.props} members={this.state.members} />
          </Col>
        </Row>
        {/* <Row>
            <Col md="auto">
                <GroupCards {...this.props} groups={this.state.groups} />
            </Col>
        </Row> */}
      </Container>
    </div>
    );
  }
}

export default Group;
