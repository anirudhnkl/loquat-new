import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

import './PendingTrades.css';

class PendingTrades extends Component {
  render() {
    return (
      <div className="PendingTrades">
        <h2>Pending Trades</h2>
        <hr />
        {this.props.trades.map((trade) => (
          <div className="trade-row container" key={trade.id}>
           <ButtonToolbar>
            <div className="col-sm">
              <Button variant="info" className="pBtn" disabled>{trade.stock}</Button>
            </div>
            <div className="col-sm">
              Yes: <Button variant="success" disabled>{trade.yes}</Button>
            </div>
            <div className="col-sm">
              No: <Button variant="danger" disabled>{trade.no}</Button>
            </div>
          </ButtonToolbar>
          </div>
        ))}
        <br />
        {this.props.trades.length ? 
        <ButtonToolbar>
          <div className="col-sm pBtn" style={{ textAlign: "right" }}>
            Vote: 
          </div>
          <div className="col-sm">
            <Button variant="success" className="pBtn" disabled>Yes</Button>
          </div>
          <div className="col-sm">
            <Button variant="danger" className="pBtn" disabled>No</Button>
          </div>
          </ButtonToolbar>
          : "None at the moment."
        }
      </div>
    );
  }
}

export default PendingTrades;
