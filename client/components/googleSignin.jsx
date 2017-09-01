import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { googleSignin, showGoogleForm }  from '../actions/userActions';

class GoogleLogIn extends React.Component {
    render() {
    const responseGoogle = (response) => {
        console.log(response);
        const googleUser = {
            fullname: response.profileObj.name,
            email: response.profileObj.email,
            showForm: false
        }
        this.props.googleSignin(googleUser).then(
           () => {
                if (this.props.googleData.showForm) {
            browserHistory.push('dashboard');
            window.location.reload();
        }
           }
        )
}
        return (
            // document.getElementById('googleButton')
            <GoogleLogin
             className='google-login'
            clientId="937103779714-qv8o05o1s7tl27ntobgae0v44u3ofp15.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            redirectUri='http://www.facebook.com'
            />
        )
    }
}

const googleLoginPropTypes = {
  googleSignin: PropTypes.func,
  showGoogleForm: PropTypes.func
 }
 PropTypes.checkPropTypes(googleLoginPropTypes, 'prop', 'GoogleLogIn');


export default connect(null, {googleSignin, showGoogleForm})(GoogleLogIn);
