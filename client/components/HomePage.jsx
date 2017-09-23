import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './LogIn.jsx';
import NavBar from './Navbar.jsx';
import { userSigninRequest, userSignupRequest } from '../actions/AuthAction';
import { setPage } from '../actions/UserAction';
import GoogleSignup from './GoogleLoginForm.jsx';

const HomePage = props =>
  (
  <div className="body-container image">
    <NavBar/>
    { props.showGoogleForm.showForm && <div className="row" >
      <div className="col m6 l6 offset-l3 offset-m3 s12 valign">
        <div className="row">
          <Login setPage={setPage}
            userSigninRequest={props.userSigninRequest}
            googleData={props.showGoogleForm}
          />
        </div>
      </div>
    </div> }
    {!props.showGoogleForm.showForm &&
      <GoogleSignup
        userSignupRequest={props.userSignupRequest}
        googleData={props.showGoogleForm}
      /> }
  </div>
  );

const HomePagePropTypes = {
  userSigninRequest: PropTypes.func,
  setPage: PropTypes.func,
  showGoogleForm: PropTypes.object
};

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  return {
    showGoogleForm: state.showGoogleForm,
    currentPage: state.setCurrentPage
  };
}

PropTypes.checkPropTypes(HomePagePropTypes, 'prop', 'HomePage');

export default connect(mapStateToProps,
  { userSigninRequest, userSignupRequest, setPage })(HomePage);
