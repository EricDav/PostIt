import React from 'react';
import PropTypes from 'prop-types';

import { setRightNavBarView } from '../../actions/setRightNavBarView';
import { connect } from 'react-redux';


class GroupButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        if(event.target.id === "VIEW MEMBERS") {
             this.props.setRightNavBarView(1)
        } else if(event.target.id === "ADD MEMBERS") {
            this.props.setRightNavBarView(2)
        }
    }
    render() {
        return (
             <button onClick={this.onClick} className="btn waves-effect waves-light groupBut" id={this.props.text} type="submit" name="action" >{this.props.text}
                 
             </button>
        )
    }
}
const setViewPropTypes = {
  setRightNavBarView: PropTypes.func
}
PropTypes.checkPropTypes(setViewPropTypes, 'prop', 'GroupButton');

export default connect(null, {setRightNavBarView})(GroupButton);