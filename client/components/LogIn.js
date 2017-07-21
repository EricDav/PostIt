import React from 'react';

class LogIn extends React.Component {
  render() {
    return ( <div id="login-page" className="col s12 z-depth-4 card-panel">
                    <form id="login" class="login-form">
                      <div className="row">
                        <div class="input-field col s12 center">
                          <h5 className="center login-form-text">Welcome, Login to get started</h5>
                        </div>
                      </div>
                      <div className="row margin">
                        <div className="input-field col s12">
                          <i className="mdi-social-person-outline prefix"></i>
                          <input id="username" type="text"/>
                          <label for="username" className="center-align">Username</label>
                        </div>
                      </div>
                      <div className="row margin">
                        <div className="input-field col s12">
                          <i className="mdi-action-lock-outline prefix"></i>
                          <input id="password" type="password"/>
                          <label for="password">Password</label>
                        </div>
                      </div>
                      <div className="row">          
                        <div className="input-field col s12 m12 l12  login-text">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <a href="index.html" class="btn purple darken-1 waves-effect waves-light col s12">Login</a>
                        </div>
                      </div>
                      <div className="row">
                      <div className="input-field col s12">
                        <p className="margin center medium-small sign-up"><a href="page-forgot-password.html">Forgot password ?</a></p>
                      </div>        
                      </div>
                    </form>
                  </div> 
             );
      }
}

export default LogIn