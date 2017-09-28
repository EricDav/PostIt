import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Group from './Group.jsx';
import { getNewGroupMessages, getInitialNewMessages }
  from '../../actions/MessageAction';
import { getNewMessage } from '../../helpers';
import { showUpdateUserPage } from '../../actions/DashboardViewAction';
console.log(getNewGroupMessages);
/** @class DashboardSideBar
 * @classdesc component for signing up with google+
 */
class DashboardSideBar extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.getGroups = this.getGroups.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  /**
   * componentWillMount - componentWillMount function
   * @return {void} no return
   */
  componentWillMount() {
    this.props.getNewGroupMessages().then(
      () => {
        this.props.getInitialNewMessages(this.props.newMessages);
      }
    );
  }
  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick() {
    if (this.props.showDashboardPage !== 2) {
      this.props.dashboardPage(2, this.props.showDashboardPage);
    }
  }
  /**
     * @description - get current user groups
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  getGroups() {
    return this.props.allGroups.map((group) => {
      return (
        <Group name={group.name} key={group.id} id={group.id}
          groupInfo={{ name: group.name, owner: group.creator }}
          newMessage={getNewMessage(group.id, this.props.newMessages)}/>
      );
    });
  }

  /**
   *@description render - renders the class component
   *@return {object} returns an object
   */
  render() {
    const groups = this.getGroups();
    return (
      <div id="email-list" className="col s7 m3 l3 card-panel z-depth-1 side">
        <ul className="collection side1">
          <li className="collection-item avatar email-unread">
            <span className="circle indigo darken-1">
              {this.props.user.fullName[0]}
            </span>
            <span className="email-title">
              {this.props.user.fullName}
            </span>
            <p className="truncate grey-text ultra-small">
              {this.props.user.email}
            </p>
            <p className="grey-text ultra-small">
              <a onClick={this.onClick} href="#!">Edit profile</a></p>
          </li>
          <li
            className={`collection-item avatar email-unread 
            group-collection group`}>
            <span className="group-title">Groups</span>
            <a className="secondary-content modal-trigger"
              href="#modal1"><span className="new bad"> + </span></a>
          </li>
          {groups}
        </ul>
      </div>

    );
  }
}

const dashboardPropTypes = {
  getNewGroupMessages: PropTypes.func,
  getInitialNewMessages: PropTypes.func,
  showUpdateUserPage: PropTypes.func
};

PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'sideBar');

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  return {
    newMessages: state.newMessages,
  };
}

export default connect(mapStateToProps, {
  showUpdateUserPage,
  getInitialNewMessages,
  getNewGroupMessages
})(DashboardSideBar);
