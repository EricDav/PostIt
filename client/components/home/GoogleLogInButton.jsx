import React from 'react';
import ReactGoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { googleSignin } from '../../actions/AuthAction';

/** @class GoogleLogIn
 * @classdesc component for Login with google+
 */
class GoogleLogInButton extends React.Component {
  /**
   *@description render - renders the Google Login component
   * @return {object} returns an object
   */
  render() {
    const responseGoogle = (response) => {
      const googleUser = {
        fullName: response.profileObj.name,
        email: response.profileObj.email,
        showForm: false
      };
      this.props.googleSignin(googleUser);
    };
    return (
      <ReactGoogleLogin
        clientId={'937103779714-qv8o05o1s7tl27ntobgae0v44u3ofp15.apps.googleusercontent.com'}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    );
  }
}

const googleLoginPropTypes = {
  googleSignin: PropTypes.func,
  showGoogleForm: PropTypes.func
};

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns state object
 */
function mapStateToProps(state) {
  return {
    googleData: state.showGoogleForm
  };
}
PropTypes.checkPropTypes(googleLoginPropTypes, 'prop', 'GoogleLogInButton');


export default connect(mapStateToProps,
  { googleSignin })(GoogleLogInButton);

