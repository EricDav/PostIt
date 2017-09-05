import React from 'react';
import PropTypes from 'prop-types';

class GroupHeader extends React.Component {
    constructor(props) {
        super(props);
        this.showAlert = this.showAlert.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            groupOption: ''
        }
    }
    showAlert() {
          swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Leave Group!'
}, () => {
    const deleteUserData = {
        userId: this.props.user.id,
        groupId: this.props.group.id
    }
    this.props.dashboardPage(0, 0);
    this.props.deleteUser(deleteUserData);
    this.props.setCurrentGroup({});
    Materialize.toast('You have been removed from the group succussfully', 2000, 'purple')
  });
}
    onClick(event) {
     if (this.props.user.username !== this.props.group.creator) {
         this.showAlert();
     } else {
         if (this.props.showDashboardPage !== 4) {
            this.props.dashboardPage(4, this.props.showDashboardPage);
         }
     }
    }
    render() {
        let groupOption;
        let creatorName;
        if (this.props.group.creator === this.props.user.username) {
            groupOption = 'Edit Group Details'
            creatorName = 'You'
        } else {
            groupOption = 'Leave Group';
            creatorName = this.props.group.creator;
        }
        return (
            <li className="collection-item avatar email-unread">
            <span className="circle indigo darken-1">{this.props.group.name[0]}</span>
            <span className="email-title">{this.props.group.name}</span>
          <p className="truncate grey-text ultra-small">Created By <b>{creatorName}</b></p>
          <p className="grey-text ultra-small"><a onClick = {this.onClick} href="#!">{groupOption}</a></p>
        </li>
        )
    }
}

const DeleteUserPropTypes = {
   deleteUser: PropTypes.func,
 }
 PropTypes.checkPropTypes(DeleteUserPropTypes, 'prop', 'GroupHeader');

export default GroupHeader;