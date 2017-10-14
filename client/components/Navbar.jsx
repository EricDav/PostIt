import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { setPage } from '../actions/UserAction';

/** @class NavBar
 * @classdesc component for Nav bar
 */
export class NavBar extends React.Component {
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
  onClick() {
    if (this.props.currentPage === 1) {
      window.location = 'signup';
      this.props.setPage(2);
    } else if (this.props.currentPage === 2) {
      browserHistory.push('/');
      this.props.setPage(1);
    } else {
      window.location = '/';
      this.props.setPage(1);
    }
  }
  /**
   *@description render - renders the Google Login component
   * @return {object} returns an object
   */
  render() {
    let currentPageText;
    if (this.props.currentPage === 1) {
      currentPageText = 'Signup';
    } else if (this.props.currentPage === 2) {
      currentPageText = 'Login';
    } else {
      currentPageText = 'Home';
    }
    return (<nav className="purple darken-1" role="navigation">
      <div className="nav-wrapper container"><a id="logo-container"
        href="#" className="brand-logo">PostIt</a>
      <ul className="right">
        <li id="clickMe" onClick={this.onClick}>
          <a href="#!"><b>{currentPageText}</b>
          </a></li>
      </ul>

      <ul id="nav-mobile" className="side-nav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile"
        className="button-collapse"><i className="material-icons">menu</i></a>
      </div>
    </nav>
    );
  }
}

const NavBarPropTypes = {
  setPage: PropTypes.func
};

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
export function mapStateToProps(state) {
  return {
    currentPage: state.setCurrentPage
  };
}

PropTypes.checkPropTypes(NavBarPropTypes, 'prop', 'NavBar');

export default connect(mapStateToProps, { setPage })(NavBar);
