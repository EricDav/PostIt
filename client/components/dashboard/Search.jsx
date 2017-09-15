import React from 'react';
import { connect } from 'react-redux';

import SearchUsers from '../../helpers/search.js';
import SearchedUser from './SearchedUser.jsx';
import getUsernames from '../../helpers/getUsername';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.onChange = this.onChange.bind(this);
    this.searchedUsers = this.searchedUsers.bind(this);
  }
  onChange(event) {
    const matchUsers = SearchUsers(event.target.value, this.props.allUsers, this.props.currentUser);
    this.setState({
      users: matchUsers
    });
  }
  searchedUsers() {
    return this.state.users.map((user) => {
      return (
        <SearchedUser fullName={user.fullName} userName={user.userName}
          userId={user.id} key={user.id} groupId = {this.props.group.id} members={getUsernames(this.props.members)}/>
      );
    });
  }
    
  render() {
    const users = this.searchedUsers();
    return (
      <ul>
        <div id="right-search" className="row">
          <form className="col s12">
            <div className="input-field">
              <i className="mdi-action-search prefix"></i>
              <input onChange={this.onChange} id="icon_prefix" type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search</label>
            </div>
          </form>
        </div>
        {users}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    allUsers: state.allUsers,
    group: state.group,
    currentUser: state.auth.user.currentUser.userName,
    members: state.members
  };
}


export default connect(mapStateToProps)(Search);
