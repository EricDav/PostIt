import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './Navbar';
import Signup from './Signup';
import { userSignupRequest } from '../actions/signupActions';

const SignupPage = (props) => {
        return (
          <div className="body-container"   className="image">
            <NavBar/>
                <center>
                        <Signup userSignupRequest={props.userSignupRequest}/>
             </center>
        </div> 
        )
}
const SignUpPagePropTypes = {
   userSignupRequest: PropTypes.func,
 }

 PropTypes.checkPropTypes(SignUpPagePropTypes, 'prop', 'SignUpPage');

export default connect(null, {userSignupRequest})(SignupPage);