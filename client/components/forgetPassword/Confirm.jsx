import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/** @class Confirm
 * @classdesc component to confirm secret code
 */
class Confirm extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      secretCode: '',
      password: '',
      confirmPassword: '',
      error: '',
      failure: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
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
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        failure: true,
        error: 'Password does not match'
      });
    } else {
      const userData = {
        response: this.state.secretCode,
        hash: this.props.user.SwZ5,
        password: this.state.password,
        userEmail: this.props.user.email,

      };
      this.props.verifyCodeAndUpdate(userData).then(
        () => {
          Materialize.toast('Password reset successfully', 2000, 'green',
            () => {
              browserHistory.push('/');
              this.props.setResetPasswordPage(false);
            });
        },
        (data) => {
          this.setState({
            failure: true,
            error: data.response.data.message
          });
        }
      );
    }
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    const { secretCode, password, confirmPassword } = this.state;
    return (
      <form id="login" className="login-form">
        <div className="row">
          <div className="input-field col s12 center">
            <h5 className="center login-form-text">Reset Password</h5><br/>
            {!this.state.failure && <h6>
              <b><i>You are almost there! Enter the secret code sent
                to your email so as to Reset your password</i>
              </b>
            </h6>}
            {this.state.failure &&
            <div className="mes"><i><b>
              <h6>{this.state.error}</h6></b></i></div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-communication-email prefix" />
            <input onChange={this.onChange}
              name="secretCode"
              id="email" type="text" value={secretCode} required="true"/>
            <label htmlFor="email" className="center-align">Secret Code</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input onChange={this.onChange} name="password"
              id="password" type="password" value={password} required="true"/>
            <label htmlFor="password">New Password</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input name="confirmPassword" onChange={this.onChange}
              value={confirmPassword} id="password" type="password"/>
            <label htmlFor="password">Confirm Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button onClick={this.onClick}
              className="btn purple darken-1 waves-effect waves-light col s12">
              Confirm
            </button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <p className="margin center medium-small sign-up"></p>
          </div>
        </div>
      </form>
    );
  }
}

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  return {
    user: state.resetPasswordUser
  };
}

export default connect(mapStateToProps, { Confirm })(Confirm);
