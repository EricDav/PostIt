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
import EditGroup from './EditGroup.jsx';
import ResetPassword from './ResetPassword.jsx';

import { getGroupsRequest, deleteCurrentGroup,
  deleteUserFromGroup, setGroup, updateCurrentGroup } from
  '../../actions/GroupAction';
import { getAllUsersRequest, updateUserProfile,
  setUpdatedUser, resetPassword } from '../../actions/UserAction';
import { dashboardPage,
  setRightNavBarView, smallScreenSize } from
  '../../actions/DashboardViewAction';
import { logout } from '../../actions/AuthAction';


/** @class Dashboard
 * @classdesc component for Dashboard
 */
class Dashboard extends React.Component {
  /**
   * componentWillMount - componentWilldMount function
   * @return {void} no return
   */
  componentWillMount() {
    this.props.getGroupsRequest();
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    if ($(window).width() < 600) {
      this.props.smallScreenSize(true);
      return (
        <div>
          <DashboardHeader
            dashboardPage={this.props.dashboardPage}
            showDashboardForm={this.props.showDashboardForm}
            logout = {this.props.logout}
          />
          <div id="main">
            <div className="wrapper">
              <section id="content">
                <div className="container">
                  <div className="row">
                    <div className="col s12">
                    </div>
                    {this.props.showDashboardPage === 0 &&
                    <DashboardSideBar
                      dashboardPage={this.props.dashboardPage}
                      allGroups={this.props.allGroups}
                      user={this.props.user}
                      showDashboardPage={this.props.showDashboardPage}
                    />}

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

                    { this.props.showDashboardPage === 5 &&
                    this.props.group.id &&
                    <RightSideBarNav
                      showDashboardPage={this.props.showDashboardPage}
                      setCurrentGroup={this.props.setGroup}
                      user={this.props.user}
                      members={this.props.members}
                      group={this.props.group}deleteUser =
                        {this.props.deleteUserFromGroup}
                      dashboardPage={this.props.dashboardPage} />}

                    {this.props.showDashboardPage === 0 &&
                  <InitialMessageBoard group={this.props.group}/>}
                  </div>
                  <CreateGroupModal group={this.props.getGroupsRequest}/>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div onChange={this.onResize}>
        <DashboardHeader
          logout = {this.props.logout}
        />
        <div id="main">
          <div className="wrapper">
            <section id="content">
              <div className="container">
                <div className="row">
                  <div className="col s12">
                  </div>
                  <CreateGroupModal group={this.props.getGroupsRequest}/>
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
                      group={this.props.group}deleteUser =
                        {this.props.deleteUserFromGroup}
                      dashboardPage={this.props.dashboardPage} />}
                  {this.props.showDashboardPage === 0 && !this.props.group.id &&
                  <InitialMessageBoard group={this.props.group}/>}
                </div>
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
  updateCurrentGroup: PropTypes.func,
  smallScreenSize: PropTypes.func,
  logout: PropTypes.func
};
PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'Dashboard');

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
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
  setRightNavBarView,
  logout,
  smallScreenSize })(Dashboard);
