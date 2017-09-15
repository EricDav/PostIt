import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPiority } from '../../actions/MessageAction';

class Piority extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    const piority = event.target.value;
    this.props.setPiority(piority);
  }
  render() {
    return (
      <form action="#" id="pform">
        <p id="piority">
          <input onClick={this.onClick} value="normal"
            name="group1" type="radio" id="test1" />
          <label htmlFor="test1">Normal</label>
        </p>
        <p id="piority">
          <input onClick={this.onClick} value="urgent" 
            name="group1" type="radio" id="test2" />
          <label htmlFor="test2">Urgent</label>
        </p>
        <p id="piority">
          <input onClick={this.onClick} className="with-gap" name="group1"
            type="radio" id="test3" value="critical" />
          <label htmlFor="test3">Critical</label>
        </p>
      </form>
    );
  }
}

const setPiorityPropTypes = {
  setPiority: PropTypes.func,
}

PropTypes.checkPropTypes(setPiorityPropTypes, 'prop', 'Piority');

export default connect(null, { setPiority })(Piority);
