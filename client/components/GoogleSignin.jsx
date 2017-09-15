import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { googleSignin, showGoogleForm }  from '../actions/UserAction';

class GoogleLogIn extends React.Component {
    render() {
    const responseGoogle = (response) => {
      const googleUser = {
        fullName: response.profileObj.name,
        email: response.profileObj.email,
        showForm: false
      };
      this.props.googleSignin(googleUser);
}
    return (
      <GoogleLogin
        clientId={`937103779714-qv8o05o1s7tl27ntobgae0v44u3ofp15.apps.
        googleusercontent.com`}
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

function mapStateToProps(state) {
  return {
    googleData: state.showGoogleForm
  };
}
PropTypes.checkPropTypes(googleLoginPropTypes, 'prop', 'GoogleLogIn');


export default connect(mapStateToProps,
  { googleSignin, showGoogleForm })(GoogleLogIn);

