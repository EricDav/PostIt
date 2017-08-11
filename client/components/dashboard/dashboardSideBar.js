import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Group from './group';
import { getGroupMessages } from '../../actions/getGroupMessages';

class sideBar extends Component {
  // const groups = allGroups.map((group) => {
    
  // });
  constructor(props, context) {
    super(props);
    this.getGroups = this.getGroups.bind(this);
  }
 getGroups() {
      return this.props.allGroups.map((group) => {
        return (
          <Group name={group.name} key={group.id} id={group.id} groupInfo={{name:group.name, owner: group.creator}}/>
        )
      })
    }


  render() {
    const groups = this.getGroups();
  return (
    <div id="email-list" className="col s10 m3 l3 card-panel z-depth-1">
      <ul className="collection">
        <li className="collection-item avatar email-unread">
          <span className="circle indigo darken-1">{this.props.user.fullname[0]}</span>
          <span className="email-title">{this.props.user.fullname}</span>
          <p className="truncate grey-text ultra-small">{this.props.user.email}</p>
          <p className="grey-text ultra-small"><a href="">edit profile</a></p>
        </li>
      <li className="collection-item avatar email-unread group-collection">
          <span className="group-title">Groups</span>
          <a className="secondary-content modal-trigger" href="#modal1"><span className="new bad"> + </span></a>
        </li>
      {groups}
      </ul>
    </div>
  );
  }
};

export default sideBar;
