import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
// import firebase from '../../firebase'

import './Portfolio.css';

// var db = firebase.firestore();

class Portfolio extends Component {
  // componentDidMount() {
  //   db.collection("users").doc(this.props.user.uid).get().then(function(doc) {
  //     if (doc.exists) {
  //       return doc.data().portfolio;
  //     }
  //   }).then((portfolioName) => {
  //     db.collection("portfolio").doc(portfolioName).get().then((doc) => {
  //       if (doc.exists) {
  //         let i = 1;
  //         let stocks = []
  //         for (var stk in doc.data().portfolio) {
  //           stocks.push({id: i, tckr: stk, quantity: doc.data().portfolio[stk]});
  //           i++;
  //         }
  //         this.setState({ stocks: stocks });
  //         console.log(stocks);
  //       }
  //     });
  //   }).catch(function(error) {
  //     console.log("Error getting document:", error);
  //   });
  // }

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
