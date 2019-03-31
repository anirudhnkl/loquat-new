import React, { Component } from "react";
import { Button, ButtonToolbar, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import Portfolio from "../components/Portfolio/Portfolio";
import Members from "../components/Members/Members";
import PendingTrades from "../components/PendingTrades/PendingTrades";

import "./Group.css";

class Group extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isLoading: true,
      amount: null,
      stocks: [],
      members: [{title: "", value: 1, color: "#000000"}],
      pending_trades: []
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
          if (member === "0") {
            amount = data
          }
          else {
            members.push(data);
          }
        }
        this.setState({ 
          amount: amount,
          members: members
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    
    axios.get('https://loquat.appspot.com/groups/pending/' + this.props.groupId)
      .then((response) => {
        var pending_trades = []
        for (let trade in response.data) {
          let data = JSON.parse(response.data[trade]);
          pending_trades.push({id: trade, ...data});
        }
        this.setState({ 
          isLoading: false,
          pending_trades: pending_trades
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return ( this.state.isLoading ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      : <div className="Group">
          <Container>
            <Row>
              <h1>Group: {this.props.groupId}</h1>
            </Row>
            <Row>
              <h3>Total Capital: {this.state.amount}</h3>
            </Row>
            <Row>
              <Col md="5">
                <Portfolio {...this.props} stocks={this.state.stocks} />
              </Col>
              <Col md="7">
                <Members {...this.props} members={this.state.members} />
              </Col>
            </Row>
            <Row>
                <Col md="auto">
                  <PendingTrades {...this.props} trades={this.state.pending_trades} />
                </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

export default Group;
