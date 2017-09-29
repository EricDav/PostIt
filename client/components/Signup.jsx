import React from 'react';
import { browserHistory } from 'react-router';

/** @class GoogleSignup
 * @classdesc component for Signup
 */
class SignUp extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      fullName: '',
      phoneNumber: '',
      message: '',
      email: '',
      password: '',
      Password: '',
      errors: {},
      textContent: 'REGISTER NOW',
      status: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
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
     * @description - handles the onblur event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onBlur(event) {
    const name = event.target.name;
    const nameObject = {};
    const error = this.state.errors;
    nameObject[name] = this.state[name];
    if (name === 'Password' && this.state[name] !== '') {
      if (this.state.password !== this.state[name]) {
        error[name] = 'Password does not match';
        this.setState({ errors: error });
      }
    } else if (nameObject[name]) {
      this.props.userSignupRequest(nameObject).then(
        () => {},
        (data) => {
          error[name] = data.response.data.error[name];
          this.setState({ errors: error });
        }
      );
    }
  }
  /**
     * @description - handles the onsubmit event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    this.setState({ error: {} });
    event.preventDefault();
    if (this.state.password !== this.state.Password) {
      error[name] = 'Password does not match';
      this.setState({ errors: error });
    } else {
      this.setState({
        textContent: 'Loading...',
        status: true
      });
      this.props.userSignupRequest(this.state).then(
        () => {
          Materialize.toast('Sign Up Successfully', 1000, 'green');
          browserHistory.push('dashboard');
        },
        (data) => {
          this.setState({
            errors: data.response.data.error,
            message: data.response.data.message,
            textContent: 'REGISTER NOW',
            status: false
          });
        }
      );
    }
  }
  /**
   *@description render - renders the Google Login component
   * @return {object} returns an object
   */
  render() {
    const { errors } = this.state;
    return (<div id="login-page" className="col s12 z-depth-4 card-panel">
      <form onSubmit={this.onSubmit} className="login-form">
        <div className="row">
          <div className="input-field col s12 center">
            <h4>Register</h4>
            <p className="center">Join our community now!</p>
            { errors.message &&
            <div className="mes reduce"><i>
              <h6>{errors.message}</h6>
            </i>
            </div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s6">
            <i className="mdi-social-person-outline prefix" />
            <input id="fullname"
              type="text"
              onChange={this.onChange}
              value={this.state.fullName}
              name="fullName" onBlur={this.onBlur} required="true"/>
            <label htmlFor="fullname" className="center-align">Full Name</label>
            {errors.fullName &&
            <div className="mes reduce">
              <i>{errors.fullName}</i></div>}
          </div>
          <div className="input-field col s6">
            <i className="mdi-social-person-outline prefix" />
            <input id="username" type="text"
              onChange={this.onChange}
              value={this.state.userName}
              name="userName" onBlur={this.onBlur} required="true"/>
            <label htmlFor="username" className="center-align">Username</label>
          </div>
          {errors.userName &&
          <div className="mes"><i>{errors.userName}</i></div>}
        </div>
        <div className="row margin">
          <div className="input-field col s6">
            <i className="mdi-communication-phone prefix" />
            <input id="phoneNumber" type="text"
              onChange={this.onChange} value={this.state.phoneNumber}
              name="phoneNumber" onBlur={this.onBlur} required="true"/>
            <label htmlFor="phoneNumber"
              className="center-align">Phone Number</label>
            {errors.phoneNumber &&
            <div className="mes"><i>{errors.phoneNumber}</i></div>}
          </div>
          <div className="input-field col s6">
            <i className="mdi-communication-email prefix" />
            <input id="email" type="email" onChange={this.onChange}
              value={this.state.email} onBlur={this.onBlur}
              name="email" required="true"/>
            <label htmlFor="email" className="center-align">Email</label>
          </div>
          {errors.email &&
          <div className="mes"><i>{errors.email}</i></div>}
        </div>
        <div className="row margin">
          <div className="input-field col s6">
            <i className="mdi-action-lock-outline prefix" />
            <input id="password" type="password"
              onChange={this.onChange} value={this.state.password}
              name="password"
              onBlur={this.onBlur} required="true"/>
            <label htmlFor="password">Password</label>
            {errors.password &&
            <div className="mes"><i>{errors.password}</i></div>}
          </div>
          <div className="input-field col s6">
            <i className="mdi-action-lock-outline prefix" />
            <input
              id="password-again" type="password"
              onChange={this.onChange} value={this.state.Password}
              name="Password" onBlur={this.onBlur} required="true"/>
            <label htmlFor="password-again">Confirm Password</label>
          </div>
          <i>{errors.Password &&
            <div className="mes">{errors.Password}</div>}</i>
        </div>
        <div className="row">
          <a className="col s12">
            <button disabled={this.state.status}
              className="btn purple darken-1 waves-effect waves-light col s12">
              {this.state.textContent}
            </button></a>
        </div>
      </form>
    </div>);
  }
}

export default SignUp;
