import React from 'react';
import GoogleLogin from 'react-google-login';

class GoogleLogIn extends React.Component {
    render() {
        const responseGoogle = (response) => {
  console.log(response);
}
        return (
            // document.getElementById('googleButton')
            <GoogleLogin
            clientId="937103779714-qv8o05o1s7tl27ntobgae0v44u3ofp15.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            />
        )
    }
}

export default GoogleLogIn;
