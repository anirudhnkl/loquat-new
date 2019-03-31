import React, { Component } from 'react';
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
      </div>
    );
  }
}

export default Members;
