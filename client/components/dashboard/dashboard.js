import React from 'react';
import { connect } from 'react-redux';

import DashboardHeader from './dashboardHeader';
import DashboardSideBar from './dashboardSideBar';
import MessageBoard from './messageBoard';
import CreateGroupModal from './createGroupModal';
import InitialMessageBoard from './initialMessage';
import RightSideBarNav from './sideBarRight';
import { getGroupsRequest } from '../../actions/getGroupsAction';
import { getGroupMessages, getGroupMembers, updateSeenMessages } from '../../actions/getGroupMessages';

import PropTypes from 'prop-types';
import { updateUserProfile, getUser, showResetPasswordUserPage, resetPassword } from '../../actions/userActions';
import { setRightNavBarView } from '../../actions/setRightNavBarView';
import EditUser from './editUser';
import Drop from './drop';
import ResetPassword from './resetPassword';
import { showUpdateUserPage } from '../../actions/userActions';

class Dashboard extends React.Component {
    componentWillMount() {
      this.props.getGroupsRequest(true);
    }
    render() {
        return (
            <div>
                <DashboardHeader/>
     <div id="main">
    <div className="wrapper">
      <section id="content">
        <div className="container">
            <div className="row">
              <div className="col s12">
              </div>
             <DashboardSideBar allGroups={this.props.allGroups} user={this.props.user}/>
            {this.props.group.id && !this.props.showUpdatePage && < MessageBoard messages={this.props.messages} setRightNavBarView={setRightNavBarView}/>}
            {this.props.showUpdatePage && !this.props.showResetPassword && <EditUser getUser={this.props.getUser} updateUserProfile =
            {this.props.updateUserProfile} user={this.props.user} showResetPassword={this.props.showResetPasswordUserPage}
            showUpdateUserPage={this.props.showUpdateUserPage}/>}
            {this.props.showResetPassword && <ResetPassword resetPassword={this.props.resetPassword}
            showResetPassword={this.props.showResetPasswordUserPage}/>}
             { this.props.group.id && <RightSideBarNav user={this.props.user} members={this.props.members} group={this.props.group}/>}
             {!this.props.group.id && !this.props.showUpdatePage && <InitialMessageBoard group={this.props.group}/>}
            </div>
            <CreateGroupModal/>
            </div>
            </section>
          </div> 
          </div>
          </div>
        );
    }
}
const dashboardPropTypes = {
  getGroupsRequest: PropTypes.func,
  setRightNavBarView: PropTypes.func,
  updateUserProfile:  PropTypes.func,
  getUser: PropTypes.func,
  showResetPasswordUserPage: PropTypes.func,
  resetPassword:  PropTypes.func,
  showUpdateUserPage:  PropTypes.func,
}
PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'Dashboard');

function mapStateToProps(state) {
  return {
    allGroups: state.groups,
    user: state.auth.user.currentUser,
    messages: state.messages,
    members: state.members,
    group: state.group,
    showUpdatePage: state.showUpdatePage,
    showResetPassword: state.showResetPassword,
    error: state.error
  };
}
export default connect(mapStateToProps, {showUpdateUserPage, resetPassword, showResetPasswordUserPage, getUser, updateUserProfile, getGroupsRequest, setRightNavBarView})(Dashboard);
