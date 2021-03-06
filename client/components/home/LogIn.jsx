import React from 'react';
import { browserHistory } from 'react-router';

import GoogleLogInButton from './GoogleLogInButton.jsx';

/** @class LogIn
 * @classdesc component for LogIn
 */
export class LogIn extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * 
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      shouldClearError: false,
      userName: '',
      password: '',
      buttonStatus: 'Login',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  /**
  * description: controls what happens after component get unrendered
  *
  * @return {void} void
  */
  componentWillUnmount() {
    this.props.userSigninRequest({}, true);
  }
  /**
     * @description - handles the onchange event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick(event) {
    if (event.target.textContent === 'Forgot password ?') {
      browserHistory.push('forgotPassword');
      this.props.setPage(3);
    } else if (event.target.textContent === ' Signup') {
      browserHistory.push('signup');
      this.props.setPage(2);
    }
  }
  /**
     * @description - handles the onsubmit event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      shouldClearError: true
    });
    this.props.userSigninRequest({ password: this.state.password,
      userName: this.state.userName });
  }
  /**
     * @description - handles the onfocus event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onFocus() {
    if (this.state.shouldClearError) {
      this.props.userSigninRequest({}, true);
    }
    this.setState({
      shouldClearError: false
    });
  }
  /**
   *@description render - renders the Google Login component
   *
   * @return {object} returns an object
   */
  render() {
    const { userName, password, clearError } = this.state;
    return (<div id="login-page" className="col s12 z-depth-4 card-panel">
      <form id="login" className="login-form" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s12 center">
            <h5
              className="center login-form-text">
              Welcome, Login to get started</h5><br/>
            {this.props.error.errorType && !clearError &&
            <div className="mes"><i>
              <b>{this.props.error.errorMessage}</b></i></div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix"/>
            <input id="username" type="text"
              onChange={this.onChange} name="userName" onFocus={this.onFocus}
              value={userName} required="true"/>
            <label htmlFor="username" className="center-align">Username</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input id="password" type="password"
              onChange={this.onChange} name="password"
              onFocus={this.onFocus} value={password} required="true"/>
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
            <button
              className="btn purple darken-1 waves-effect waves-light col s12"
              disabled={this.props.isLoading}>Login</button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <center>
              <GoogleLogInButton/>
            </center>
            <p className="margin center medium-small sign-up">
              <a onClick={this.onClick} href="#!">Forgot password ?</a>
            </p>
            <p className="margin center medium-small sign-up">
              <i>No account?</i>
              <a id="clickMe" onClick={this.onClick} href="#!"> Signup</a>
            </p>
          </div>
        </div>
      </form>
    </div>);
  }
}

export default LogIn;

