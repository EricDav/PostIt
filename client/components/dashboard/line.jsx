import React from 'react';

class Line extends React.Component {
  render() {
      return (
          <li className= "collection-item">
            <div className="line">
            <hr color="red" className="line1" />
            <hr color="red"  className= "line2" />
            <div className="message">New Messages</div>
          </div>
        </li>
      )
  }
}

export default Line;