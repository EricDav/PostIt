import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './Navbar.jsx';
import Signup from './Signup.jsx';
import { userSignupRequest } from '../actions/AuthAction';

const SignupPage = props =>
  (
  <div className="body-container image">
    <NavBar/>
    <center>
      <Signup userSignupRequest={props.userSignupRequest}/>
    </center>
  </div>
  );
const SignUpPagePropTypes = {
  userSignupRequest: PropTypes.func,
};

PropTypes.checkPropTypes(SignUpPagePropTypes, 'prop', 'SignUpPage');

export default connect(null, { userSignupRequest })(SignupPage);
