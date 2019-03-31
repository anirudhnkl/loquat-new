import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

import './Portfolio.css';

class Portfolio extends Component {
  render() {
    return (
      <div className="Portfolio">
        <h2>Portfolio</h2>
        <hr />
        {this.props.stocks.map((stock) => (
          <div className="stock-row container" key={stock.id}>
           <ButtonToolbar>
            <div className="col-sm">
              <Button variant="info" className="pBtn" disabled>{stock.symbol}</Button>
            </div>
            <div className="col-sm">
              <Button variant="success" className="pBtn" disabled>{stock.price}</Button>
            </div>
            <div className="col-sm">
              <Button variant="outline-dark" className="pBtn" disabled>{stock.quantity} {stock.quantity > 1 ? "shares" : "share"}</Button>
            </div>
          </ButtonToolbar>
          </div>
        ))}
      </div>
    );
  }
}

export default Portfolio;
