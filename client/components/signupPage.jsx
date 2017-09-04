import React from 'react';
import { connect } from 'react-redux';

import NavBar from './navbar';
import SignUp from './signup';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../actions/signupActions';

class SignupPage extends React.Component {
    render() {
        return (
          <div className="body-container"   className="image">
            <NavBar/>
                <center>
                        <SignUp userSignupRequest={this.props.userSignupRequest}/>
             </center>
        </div> 
        )
    }
}
const SignUpPagePropTypes = {
   userSignupRequest: PropTypes.func,
 }

 PropTypes.checkPropTypes(SignUpPagePropTypes, 'prop', 'SignUpPage');

export default connect(null, {userSignupRequest})(SignupPage);