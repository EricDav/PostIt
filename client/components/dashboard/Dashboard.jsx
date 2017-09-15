import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DashboardHeader from './DashboardHeader.jsx';
import DashboardSideBar from './DashboardSideBar.jsx';
import MessageBoard from './MessageBoard.jsx';
import CreateGroupModal from './CreateGroupModal.jsx';
import InitialMessageBoard from './InitialMessage.jsx';
import RightSideBarNav from './RightSideBar.jsx';
import EditUser from './EditUser.jsx';
import Drop from './Drop.jsx';
import EditGroup from './EditGroup.jsx';
import ResetPassword from './ResetPassword.jsx';

import { getGroupsRequest, deleteCurrentGroup,
  deleteUserFromGroup, setGroup, updateCurrentGroup } from '../../actions/GroupAction';
import { getAllUsersRequest, updateUserProfile,
  setUpdatedUser, resetPassword } from '../../actions/UserAction';
import { dashboardPage,
  setRightNavBarView } from '../../actions/DashboardViewAction';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.getGroupsRequest();
    this.props.getAllUsersRequest();
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
                  <DashboardSideBar
                    dashboardPage={this.props.dashboardPage}
                    allGroups={this.props.allGroups}
                    user={this.props.user}
                    showDashboardPage={this.props.showDashboardPage}
                  />

                  {this.props.showDashboardPage === 1 &&
                  < MessageBoard
                    messages={this.props.messages}
                    setRightNavBarView={setRightNavBarView}
                  />}

                  {this.props.showDashboardPage === 2 &&
                  <EditUser
                    setUpdatedUser={this.props.setUpdatedUser}
                    updateUserProfile={this.props.updateUserProfile} 
                    user={this.props.user}
                    showUpdateUserPage={this.props.dashboardPage}
                    currentUser={this.props.user}
                    showInitial={this.props.initialDashboardPage}
                    showDashboardPage={this.props.showDashboardPage}
                  />}

                  {this.props.showDashboardPage === 4 &&
                  <EditGroup
                    setCurrentGroup={this.props.setGroup}
                    currentGroup={this.props.group}
                    showInitial={this.props.initialDashboardPage}
                    updateCurrentGroup={this.props.updateCurrentGroup}
                    deleteCurrentGroup={this.props.deleteCurrentGroup}
                    dashboardPage={this.props.dashboardPage}
                  />}

                  {this.props.showDashboardPage === 3 &&
                   <ResetPassword
                     resetPassword={this.props.resetPassword}
                     showResetPassword={this.props.dashboardPage}
                     currentGroup={this.props.group}
                     showInitial={this.props.initialDashboardPage}
                   />}

                  { this.props.showDashboardPage > 0 && this.props.group.id &&
                    <RightSideBarNav
                      showDashboardPage={this.props.showDashboardPage}
                      setCurrentGroup={this.props.setGroup}
                      user={this.props.user}
                      members={this.props.members}
                      group={this.props.group}deleteUser = {this.props.deleteUserFromGroup}
                      dashboardPage={this.props.dashboardPage} />}

                  {this.props.showDashboardPage === 0 && <InitialMessageBoard group={this.props.group}/>}

                </div>

                <CreateGroupModal group={this.props.getGroupsRequest}/>
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
  updateUserProfile: PropTypes.func,
  setUpdatedUser: PropTypes.func,
  resetPassword: PropTypes.func,
  dashboardPage: PropTypes.func,
  getGroupMessages: PropTypes.func,
  deleteUserFromGroup: PropTypes.func,
  deleteCurrentGroup: PropTypes.func,
  getAllUsersRequest: PropTypes.func,
  setGroup: PropTypes.func,
  updateCurrentGroup: PropTypes.func
};
PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'Dashboard');

function mapStateToProps(state) {
  return {
    allGroups: state.groups,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user.currentUser,
    messages: state.messages,
    members: state.members,
    group: state.group,
    showDashboardPage: state.showDashboardForm,
    error: state.error,
    showEditGroupForm: state.showEditGroupForm,
    initialDashboardPage: state.initialDashboardPage
  };
}
export default connect(mapStateToProps, {
  dashboardPage,
  updateCurrentGroup,
  setGroup,
  getAllUsersRequest,
  deleteUserFromGroup,
  getGroupsRequest,
  deleteCurrentGroup,
  resetPassword,
  setUpdatedUser,
  updateUserProfile,
  setRightNavBarView })(Dashboard);
