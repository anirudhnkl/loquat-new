import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

import './Recommendations.css';

const recs = [
  {id: 1, symbol: "AAPL", score: 21},
  {id: 2, symbol: "MSFT", score: 11},
  {id: 3, symbol: "GOOG", score: 1}
]

class Recommendations extends Component {
  render() {
    return (
      <div className="Recommendations">
        <h2>Recommendations</h2>
        <hr />
        {/*this.props.*/recs.map((rec) => (
          <div className="rec-row container" key={rec.id}>
           <ButtonToolbar>
            {/* <div className="col-sm">
              <Button variant="outline-dark" className="pBtn" disabled>{rec.id}</Button>
            </div> */}
            <div className="col-sm-1 pBtn">
              {rec.id}. 
            </div>
            <div className="col-sm">
              <Button variant="info" className="pBtn" disabled>{rec.symbol}</Button>
            </div>
            <div className="col-sm">
              <Button variant="success" className="pBtn" disabled>Score: {rec.score}</Button>
            </div>
          </ButtonToolbar>
          </div>
        ))}
      </div>
    );
  }
}

export default Recommendations;
