import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './GroupCards.css';

class GroupCards extends Component {
  render() {
    return (
      <div className="GroupCards">
        <h2>Groups</h2>
        <hr />
        <CardColumns style={{ columnCount: 2 }}>
        {this.props.groups.map(group => (
            <Link to={"/groups/" + group.name}>
            <Card key={group.id} bg="info" text="white" className="group-card">
              <Card.Body>
                <Card.Title>{group.name}</Card.Title>
                <Card.Text className="mb-2">Amount Invested: {group.amt}</Card.Text>
                <Card.Text className="mb-2">Total Capital: {group.value}</Card.Text>
              </Card.Body>
            </Card>
            </Link>
        ))}
        </CardColumns>
      </div>
    );
  }
}

export default GroupCards;
