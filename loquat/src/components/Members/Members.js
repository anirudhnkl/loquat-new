import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PieChart from 'react-minimal-pie-chart';

import './Members.css';

class Members extends Component {  
  render() {
    const defaultLabelStyle = {
      fontSize: '5px',
      fill: '#ffffff',
    };

    return (
      <div className="Members">
        <h2>Members</h2>
        <hr />
        <PieChart
          data={this.props.members}
          cx={50}
          cy={30}
          radius={30}
          label={({ data, dataIndex }) =>
            data[dataIndex].title
          }
          labelStyle={defaultLabelStyle}
          animate
        />
        {/* {this.props.members.map(member => (
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
        ))} */}
      </div>
    );
  }
}

export default Members;
