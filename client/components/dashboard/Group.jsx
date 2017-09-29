import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGroupMessages, updateSeenMessages,
  getNewGroupMessages } from '../../actions/MessageAction';
import { getGroupMembers, setGroup } from '../../actions/GroupAction';
import { getAllUsersRequest } from '../../actions/UserAction';
import { dashboardPage } from '../../actions/DashboardViewAction';
import { getMessageIds } from '../../helpers';


/** @class Group
 * @classdesc component for a single group
 */
export class Group extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      groupId: 0,
    };
  }
  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick(event) {
    let groupId;
    if (event.target.id !== this.props.currentGroupId) {
      groupId = event.target.id;
      this.setState({
        groupId: event.target.id
      });
      this.props.getGroupMembers(groupId.toString());
      this.props.getGroupMessages(groupId.toString()).then(
        () => {
          const seenMessageIds = getMessageIds(this.props.messages);
          const updateSeenMessagesData = { seenMessageIds,
            seenLast: seenMessageIds.length };
          this.props.updateSeenMessages(groupId.toString(),
            updateSeenMessagesData);
          this.props.dashboardPage(1, this.props.showDashboardPage);
          this.props.getNewGroupMessages();
        }
      );
      this.props.groups.forEach((group) => {
        if (group.id.toString() === event.target.id) {
          this.props.setGroup(group);
        }
      });
    }
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      <li className="collection-item avatar email-unread group-channel group">
        <a href="#!"><span id={this.props.id}
          value={this.props.groupInfo} className="group-title"
          onClick={this.onClick}>{this.props.name}</span></a>
        {this.props.newMessage > 0
        && <a href="#!" className="secondary-content"><span id={this.props.id}
            value={this.props.groupInfo} className="new bad">
            {this.props.newMessage}
          </span></a>}
      </li>
    );
  }
}

const dashboardPropTypes = {
  getGroupMessages: PropTypes.func,
  setGroup: PropTypes.func,
  getGroupMembers: PropTypes.func,
  getAllUsersRequest: PropTypes.func,
  updateSeenMessages: PropTypes.func,
  getNewGroupMessages: PropTypes.func,
  dashboardPage: PropTypes.func,
};
PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'Group');
/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
export function mapStateToProps(state) {
  return {
    groups: state.groups,
    messages: state.messages,
    currentGroupId: state.group.id,
    showDashboardPage: state.showDashboardForm
  };
}

export default connect(mapStateToProps,
  {
    dashboardPage,
    getNewGroupMessages,
    updateSeenMessages,
    getGroupMessages,
    setGroup,
    getGroupMembers,
    getAllUsersRequest
  })(Group);
