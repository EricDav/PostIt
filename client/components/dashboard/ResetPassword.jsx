import React from 'react';

/** @class ResetPassword
 * @classdesc component for Reset password
 */
class ResetPassword extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
      error: '',
      buttonContent: 'Change Password',
      status: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
     * @description - handles the onclick event
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
  onSubmit(event) {
    event.preventDefault();
    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        error: 'Password does not match'
      });
    } else {
      this.setState({
        status: true,
        buttonContent: 'Loading...'
      });
      this.props.resetPassword(this.state).then(
        () => {
          let initialPage;
          if (this.props.currentGroup.id) {
            initialPage = 1;
          } else {
            initialPage = 0;
          }
          this.props.showResetPassword(this.props.showInitial, initialPage);
          Materialize.toast('Your password has been reset', 1500, 'purple');
        },
        (data) => {
          this.setState({
            error: data.response.data.message,
            status: false,
            buttonContent: 'Change Password'
          });
        }
      );
    }
  }
  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick() {
    let initialPage;
    if (this.props.currentGroup.id) {
      initialPage = 1;
    } else {
      initialPage = 0;
    }
    this.props.showResetPassword(2, initialPage);
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (<div id="email-details"
      className="col s12 m6 l6 card-panel my">
      <form onSubmit={this.onSubmit} className="login-form">
        <div className="row">
          <div className="input-field col s12 center">
            <h5 className="center"><b>Reset Password</b></h5>
            {this.state.error &&
            <div className="mes center"><i>{this.state.error}</i></div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input className="showLabelFullname" onChange={this.onChange}
              name= "oldPassword"
              id="password" type="password" required="true"/>
            <label htmlFor="fullname"
              className="center-align">Old Password</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input className="showLabelUsername" onChange={this.onChange}
              name= "newPassword"
              id="password" type="password" required="true"/>
            <label htmlFor="username"
              className="center-align">New Password</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input className="showLabelPhoneNumber" onFocus={this.onFocus}
              onChange={this.onChange} name= "confirmPassword"
              id="password-again"
              type="password" required="true"/>
            <label htmlFor="phoneNumber"
              className="center-align">Confirm New Password</label>
          </div>
        </div>
        <div className="row">
          <a className="col s12">
            <button className={`btn purple darken-1 waves-effect 
              waves-light col s12`}
            disabled={this.state.status}>
              {this.state.buttonContent}
            </button></a>
        </div>
        <div className="col s12 resetUser">
          <p className="margin center medium-small sign-up">
            <a onClick={this.onClick} href="#!">Edit Profile</a>
          </p>
        </div>
      </form>
    </div>);
  }
}

export default ResetPassword;
