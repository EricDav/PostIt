import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './Navbar.jsx';
import Signup from './Signup.jsx';
import { userSignupRequest } from '../actions/AuthAction';

const SignupPage = props =>
  (
  <div className="body-container image">
    <NavBar/> <div className="row" >
      <div className="col l8 offset-l2 m10 offset-m1 s12 valign reset">
        <div className="row">
          <Signup userSignupRequest={props.userSignupRequest}/>
        </div>
      </div>
    </div>
  </div>
  );
const SignUpPagePropTypes = {
  userSignupRequest: PropTypes.func,
};

PropTypes.checkPropTypes(SignUpPagePropTypes, 'prop', 'SignUpPage');

export default connect(null, { userSignupRequest })(SignupPage);
