import React, { Component } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import axios from "axios"

import "./Trade.css";

class Trade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      tkcr: "",
      num_shares: 1,
      portfolio: "",
      available_portfolios: []
    };
  }

  componentDidMount() {    
    axios.get('https://loquat.appspot.com/user/trade/' + this.props.userId)
      .then((response) => {
        var available_portfolios = []
        for (let key in response.data) {
          let data = JSON.parse(response.data[key]);
          available_portfolios.push({id: key, portfolio: data});
        }
        this.setState({ available_portfolios: available_portfolios });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  validateForm() {
    return this.state.tkcr.length > 0 && this.state.num_shares.length > 0 && this.state.portfolio.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    // axios post
  }

  render() {    
    return (
      <div className="Login">
        <Container>
          <Form onSubmit={this.handleSubmit} bsPrefix="form">
            <Form.Group controlId="tck">
              <Form.Label>Ticker:</Form.Label>
              <Form.Control 
                autoFocus
                type="text"
                value={this.state.tckr}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="num_shares">
              <Form.Label>Number of Shares:</Form.Label>
              <Form.Control 
                value={this.state.num_shares}
                onChange={this.handleChange}
                type="number"
              />
            </Form.Group>

            <Form.Group controlId="portfolio">
              <Form.Label>Portfolio:</Form.Label>
              <Form.Control as="select">
              {this.state.available_portfolios.map((portfolio) => (
                <option key={portfolio.id}>{portfolio.name}</option>
              ))}
              </Form.Control>
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

export default Trade;
