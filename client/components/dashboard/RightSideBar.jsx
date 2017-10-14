import React from 'react';
import { connect } from 'react-redux';

import Member from './Members.jsx';
import Search from './Search.jsx';
import GroupHeader from './GroupHeader.jsx';
import GroupMember from './GroupMembers.jsx';
import { searchUsers } from '../../actions/UserAction';

/** @class RightSideBar
 * @classdesc component for the right side bar
 */
export class RightSideBar extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.getMembers = this.getMembers.bind(this);
  }
  /**
     * @description - get the members of the current group
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  getMembers() {
    return this.props.members.map((member) => {
      return (
        <Member member={member} key={member.id}/>
      );
    });
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    const members = this.getMembers();
    const search = <Search
      searchUsers={this.props.searchUsers}
      users={this.props.users}
    />;
    const groupMember = <GroupMember/>;
    return (
      <div id="email-list" className="col s12 m3 offset-m9 l3 offset-l9 card-panel">
        <ul className="collection">
          <GroupHeader showDashboardPage ={this.props.showDashboardPage}
            setCurrentGroup={this.props.setCurrentGroup}
            deleteUser={this.props.deleteUser} user={this.props.user}
            group={this.props.group} dashboardPage={this.props.dashboardPage}/>
          {this.props.viewNumber === 1 && groupMember}
          {this.props.viewNumber === 1 && members}
          {this.props.viewNumber === 2 && search}
        </ul>
      </div>
    );
  }
}

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
export function mapStateToProps(state) {
  return {
    viewNumber: state.viewNumber,
    showDashboardPage: state.showDashboardForm,
    users: state.searchedUsers

  };
}

export default connect(mapStateToProps, { searchUsers })(RightSideBar);
