import React from 'react';

class SignUp extends React.Component {
    render() {
        return (<div id="signup-page" className="col s12 z-depth-4 card-panel">
                <form className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h4>Register</h4>
                      <p className="center">Join to our community now !</p>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="fullname" type="text" />
                      <label htmlFor="fullname" className="center-align">Full Name</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="username" type="text" />
                      <label htmlFor="username" className="center-align">Username</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-communication-email prefix" />
                      <input id="email" type="email" />
                      <label htmlFor="email" className="center-align">Email</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password" type="password" />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password-again" type="password" />
                      <label htmlFor="password-again">Password again</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <a href="index.html" className="btn purple darken-1 waves-effect waves-light col s12">Register Now</a>
                    </div>
                  </div>
                </form>
              </div>);
    }
}

export default SignUp;