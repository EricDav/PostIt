import React from 'react';
import { connect } from 'react-redux';

import { isInValidField, getUsernames } from '../../helpers';
import SearchedUser from './SearchedUser.jsx';

/** @class Search
 * @classdesc component for Searching user
 */
class Search extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.onChange = this.onChange.bind(this);
    this.searchedUsers = this.searchedUsers.bind(this);
  }
  /**
     * @description - handles the onchange event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onChange(event) {
    if (!isInValidField(event.target.value)) {
      this.props.searchUsers(event.target.value);
    }
  }
  /**
     * @description - get users base on search input
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  searchedUsers() {
    return this.props.users.map((user) => {
      return (
        <SearchedUser fullName={user.fullName} userName={user.userName}
          userId={user.id} key={user.id} groupId = {this.props.group.id}
          members={getUsernames(this.props.members)}/>
      );
    });
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    const users = this.searchedUsers();
    return (
      <ul>
        <div id="right-search" className="row">
          <form className="col s12">
            <div className="input-field">
              <i className="mdi-action-search prefix"></i>
              <input onChange={this.onChange} id="icon_prefix"
                type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search</label>
            </div>
          </form>
        </div>
        {users}
      </ul>
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
function mapStateToProps(state) {
  return {
    allUsers: state.allUsers,
    group: state.group,
    currentUser: state.auth.user.currentUser.userName,
    members: state.members,
    users: state.searchedUsers.mathchedUsers
  };
}


export default connect(mapStateToProps)(Search);
