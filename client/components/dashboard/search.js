import React from 'react';
import { connect } from 'react-redux';
import SearchUsers from '../../helpers/search.js';
import SearchedUser from './searchedUser';
import getFullnames from '../../helpers/getFullname'

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
        console.log(this.props.members)
        return this.state.users.map((user) => {
          return (
            <SearchedUser fullname={user.fullname} userId={user.id} key={user.id} groupId = {this.props.group.id} members={getFullnames(this.props.members)}/>
          );
      });
    }
    
    render() {
        const users = this.searchedUsers();
        return (
            //  <aside id="right-sidebar-nav">
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
        currentUser: state.auth.user.currentUser.fullname,
        members: state.members
    }
}


export default connect(mapStateToProps)(Search);