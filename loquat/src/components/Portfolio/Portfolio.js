import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

import './Portfolio.css';

var stocks = ["AAPL", "GOOG", "FB", "SNAP"];

class Portfolio extends Component {
  render() {
    return (
      <div className="Portfolio">
        <h1>Portfolio</h1>
        <hr />
        {stocks.map(stock => (
          <div className="stock-row container " key={stock}>
           <ButtonToolbar>
            <div className="col-sm-2">
              <Button variant="info" className="btn btn-primary tckr" disabled>{stock}</Button>
            </div>
            <div className="col-sm-10">
              <p className="info">More info about stock More info about stock More info about stock</p>
            </div>
          </ButtonToolbar>
          </div>
        ))}
      </div>
    );
  }
}

export default Portfolio;
