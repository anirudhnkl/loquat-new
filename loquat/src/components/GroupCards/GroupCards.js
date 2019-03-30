import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap';

import './GroupCards.css';

var groups = [
  {id: 1, name: "One", desc:"HAHAHA this is description", link:"clout"},
  {id: 2, name: "Two", desc:"HAHAHA this is description HAHAHA this is description HAHAHA this is description HAHAHA this is description", link:"clout"},
  {id: 3, name: "Three", desc:"HAHAHA this is description", link:"clout"},
  {id: 4, name: "Four", desc:"HAHAHA this is description", link:"clout"},
  {id: 5, name: "Five", desc:"HAHAHA this is description HAHAHA this is description HAHAHA this is description HAHAHA this is description HAHAHA this is description", link:"clout"},
  {id: 6, name: "Six", desc:"HAHAHA this is description", link:"clout"}
];

class GroupCards extends Component {
  handleLogout = async event => {
    this.userHasAuthenticated(false);
  }

  render() {
    return (
      <div className="GroupCards">
        <h1>Groups</h1>
        <hr />
        <CardColumns>
        {groups.map(group => (
            <Card key={group.id} className="group-card">
              <Card.Body>
                <Card.Title>{group.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{group.desc}</Card.Subtitle>
                {/* <Card.Text>{group.desc}</Card.Text> */}
                <Card.Link href={group.link}>Go to Group</Card.Link>
              </Card.Body>
            </Card>
        ))}
        </CardColumns>
      </div>
    );
  }
}

export default GroupCards;
