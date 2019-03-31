import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

import './Members.css';

class Members extends Component {
  render() {
    return (
      <div className="Members">
        <h2>Members</h2>
        <hr />
        {this.props.members.map(member => (
          <div className="member-row container" key={member.id}>
            <ButtonToolbar>
              <div className="col-sm">
                <p className="name">Name: {member.name}</p>
              </div>
              <div className="col-sm">
                <Button variant="success" className="pBtn" disabled>{member.amt}</Button>
              </div>
            </ButtonToolbar>
          </div>
        ))}
      </div>
    );
  }
}

export default Members;
