import React from 'react';
import { getGroupMessages, getGroupMembers, updateSeenMessages } from '../../actions/getGroupMessages';
import { getNewGroupMessages } from  '../../actions/getGroupsAction';
import { getAllUsersRequest } from '../../actions/getAllUsersAction';
import { setGroup } from '../../actions/setCurrentGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showUpdateUserPage } from '../../actions/userActions';
import getMessageViewers from '../../helpers/getMessageViewers';
import getMessageIds from '../../helpers/getMessageIds';

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        const groupId = event.target.id
        this.props.getGroupMembers(groupId.toString());
        this.props.getGroupMessages(groupId.toString()).then(
            () => {
                const seenMessageIds = getMessageIds(this.props.messages);
                const updateSeenMessagesData = {seenMessageIds,
                seenLast: seenMessageIds.length}
                this.props.updateSeenMessages(groupId.toString(), updateSeenMessagesData).then(
                    () => {
                        this.props.getNewGroupMessages();
                        this.props.showUpdateUserPage(false);

                    }
                );
            }
        )
        this.props.getAllUsersRequest();
        this.props.groups.forEach((group) => {
            if (group.id.toString() === event.target.id) {
                this.props.setGroup(group);
            }
        });
        
    }
    render() {
        return (
            <li className="collection-item avatar email-unread group-channel group">
                <a href="#!"><span id={this.props.id} value={this.props.groupInfo} className="group-title" onClick={this.onClick}>{this.props.name}</span></a>
                {this.props.newMessage > 0 && <a href="#!" className="secondary-content"><span id={this.props.id}
                value={this.props.groupInfo} className="new bad">{this.props.newMessage}</span></a>}
            </li>
        )
    }
}

const dashboardPropTypes = {
  getGroupMessages: PropTypes.func,
  setGroup: PropTypes.func,
  getGroupMembers: PropTypes.func,
  getAllUsersRequest: PropTypes.func,
  updateSeenMessages: PropTypes.func,
  getNewGroupMessages: PropTypes.func,
  showUpdateUserPage: PropTypes.func
}
PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'Group');
function mapStateToProps(state) {
    return{
        groups: state.groups,
        messages: state.messages,
        currentGroup: state.group
    }
} 

export default connect(mapStateToProps, {showUpdateUserPage, getNewGroupMessages, updateSeenMessages, getGroupMessages, setGroup, getGroupMembers, getAllUsersRequest})(Group);