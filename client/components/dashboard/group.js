import React from 'react';
import { getGroupMessages } from '../../actions/getGroupMessages';
import { setGroup } from '../../actions/setCurrentGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        this.props.getGroupMessages(event.target.id.toString());
        this.props.groups.forEach((group) => {
            console.log('no')
            if (group.id.toString() === event.target.id) {
                this.props.setGroup(group)
            }
        })
        console.log(event.target.id.toString())
       console.log(event.target.value)
    }
    render() {
        return (
            <li className="collection-item avatar email-unread group-channel">
                <a><span className="group-title">{this.props.name}</span></a>
                <a href="#!" className="secondary-content"><span onClick={this.onClick}  id={this.props.id} value={this.props.groupInfo} className="new badge reddish">6</span></a>
            </li>
        )
    }
}

const dashboardPropTypes = {
  getGroupMessages: PropTypes.func,
  setGroup: PropTypes.func
}
PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'Group');
function mapStateToProps(state) {
    return{
        groups: state.groups
    }
} 

export default connect(mapStateToProps, {getGroupMessages, setGroup})(Group);