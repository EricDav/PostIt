import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import Google from './GoogleSignin';

export class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      userName: '',
      password: '',
      isLoading: false,
      error: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  }
  onClick(event) {
    if (event.target.textContent === 'Forgot password ?') {
      browserHistory.push('forgotPassword');
      this.props.setPage(3);
    } else if(event.target.textContent === 'Signup') {
      browserHistory.push('signup');
      this.props.setPage(2);
    }
  }
  onSubmit(event) {
    this.setState({error: {}, isLoading: true});
    event.preventDefault();
    this.props.userSigninRequest({password:this.state.password, userName: this.state.userName}).then(
      () => {
        Materialize.toast('Logged In Successfully', 1500, 'green',
      () => {
        browserHistory.push('dashboard');
      });
      },
      ( data ) => {
        this.setState({error: data.response.data, userName: '', password: '', isLoading: false, success: true}, );
      }
    )
  }
  onFocus(event) {
    this.setState({success: false});
  }
  render() {
    const { error, userName, password, isLoading, success, value } = this.state;
    return (<div id="login-page" className="col s12 z-depth-4 card-panel">
                <form id="login" className="login-form" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h5 className="center login-form-text">Welcome, Login to get started</h5><br/>
                      {success && <div className="mes"><i><b>{error.message}</b></i></div>}
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="username" type="text" onChange={this.onChange} name="userName" onFocus={this.onFocus} value={userName} required="true"/>
                      <label htmlFor="username" className="center-align">Username</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password" type="password" onChange={this.onChange} name="password" onFocus={this.onFocus} value={password} required="true"/>
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 l12  login-text">
                      <input type="checkbox" id="remember-me"/>
                      <label htmlFor="remember-me">Remember me</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <button className="btn purple darken-1 waves-effect waves-light col s12" disabled={isLoading}>Login</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <center>
                            <Google/>
                          </center>
                      <p className="margin center medium-small sign-up">
                        <a onClick={this.onClick} href="#!">Forgot password ?</a>
                        </p>
                         <p className="margin center medium-small sign-up">
                        <i>No account?</i>
                        <a onClick={this.onClick} href="#!"> Signup</a>
                        </p>
                    </div>
                  </div>
                </form>
              </div>);
      }
}

export default LogIn

