import React from 'react';
import SignUp from './signup';
import Login from './LogIn';
import NavigationBar from './NavigationBar';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import userSignupRequest from '../actions/signupActions';
import { userSigninRequest } from '../actions/authActions';
import PropTypes from 'prop-types';
import setFlashMessage from '../actions/flashMessages';

class HomePage extends React.Component {
    render() {
      const {userSignupRequest, setFlashMessage, userSigninRequest} = this.props;
        return (
       <div className="body-container"   className="image">
        <NavBar/>
        <div className="row" >
          <div className="col s6 offset-s3 valign">
            <div className="row">
              <ul className="tabs tab-profile z-depth-1 purple darken-1" style={{ width: 100 }}>
                <li className="tab" style={{ width: 50 }}>
                    <a className="white-text waves-effect waves-light active" href="#login-page"><i className="mdi-editor-border-color" />Login</a>
                </li>
                <li className="tab" style={{ width: 50 }}><a className="white-text waves-effect waves-light" href="#signup-page"><i className="mdi-image-camera-alt" /> Register</a>
                </li>
                <div className="indicator" style={{ right: 616, left: 0 }} />
              </ul>
              <Login userSigninRequest={userSigninRequest}/>
              <SignUp userSignupRequest={userSignupRequest} setFlashMessage={setFlashMessage}/>
            </div>
          </div>
        </div>
       </div>
        );
    }
}

HomePage.propTypes = {
   userSignupRequest: PropTypes.func.isRequired,
   userSigninRequest: PropTypes.func.isRequired,
   setFlashMessage: PropTypes.func.isRequired
 }


export default connect(null, {userSignupRequest, setFlashMessage, userSigninRequest})(HomePage);
