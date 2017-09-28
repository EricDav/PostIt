import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/AuthAction';

/** @class DashboardHeader
 * @classdesc component for dashboard header it hold different
 * data for different screen size
 */
export class DashboardHeader extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick(event) {
    if (event.target.textContent === 'Logout') {
      this.props.logout();
    } else if (this.props.currentPage < 4) {
      this.props.dashboardPage(0, 0);
    } else {
      this.props.dashboardPage(1, 0);
    }
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    let navigate;
    if (this.props.currentPage < 4) {
      navigate = 'Groups';
    } else {
      navigate = 'Message board';
    }
    return (
      <nav className="purple darken-1" role="navigation">
        <div className="nav-wrapper container left nav">
          <a id="logo-container" className="brand-logo post">PostIt</a>
          {this.props.isSmallScreenSize && <ul className="left">
            <li><a onClick={this.onClick} href="#">{navigate}</a></li>
          </ul>}
          <ul className="right">
            <li><a id='logout' onClick ={this.onClick} href="#">Logout</a></li>
          </ul>
          <ul id="nav-mobile" className="side-nav">
            <li><a href="#">Navbar Link</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

const dashboardHeaderPropTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func,
  user: PropTypes.string,
  isSmallScreenSize: PropTypes.bool
};

PropTypes.checkPropTypes(dashboardHeaderPropTypes, 'prop', 'DashboardHeader');
/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
export function mapStateToProps(state) {
  return {
    isSmallScreenSize: state.screenSize,
    currentPage: state.showDashboardForm
  };
}

export default connect(mapStateToProps, { logout })(DashboardHeader);
