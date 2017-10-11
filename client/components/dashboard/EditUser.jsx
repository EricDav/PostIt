import React from 'react';

/** @class EditUser
 * @classdesc component for Editing user profile
 */
class EditUser extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      showLabelFullname: false,
      showLabelEmail: false,
      showLabelPhoneNumber: false,
      fullName: this.props.user.fullName,
      userName: this.props.user.userName,
      email: this.props.user.email,
      phoneNumber: this.props.user.phoneNumber,
      displayButton: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
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
    setTimeout(() => {
      const { fullName, email, phoneNumber } = this.state;
      if (this.state.user.fullName !== fullName ||
      this.state.user.userName !== this.state.userName ||
        this.state.user.email !== email ||
        this.state.user.phoneNumber !== phoneNumber) {
        this.setState({
          displayButton: true
        });
      } else {
        this.setState({
          displayButton: false
        });
      }
    }, 500);
  }
  /**
     * @description - handles the onsubmit event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit() {
    event.preventDefault();
    if (!this.state.displayButton) {
      this.props.showUpdateUserPage(this.props.showInitial,
        this.props.showDashboardPage);
    } else {
      const updatedUser = { currentUser: {
        fullName: this.state.fullName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        userName: this.props.currentUser.userName
      } };
      this.props.updateUserProfile(this.state, updatedUser).then(
        () => {
          this.props.showUpdateUserPage(this.props.showInitial, 1);
          Materialize.toast('Your prifile has been updated', 1500, 'green');
        },
        (data) => {
          if (data.response.data.message === 'Failed to authenticate token.') {
            Materialize.toast('Can not edit user details. Your session has expired',
              2000, 'red', () => {
                localStorage.removeItem('jwtToken');
                window.location = '/';
              });
          } else {
            this.setState({
              errors: data.response.data.error,
            });
          }
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
    this.props.showUpdateUserPage(3, this.props.showDashboardPage);
  }
  /**
     * @description - handles the onfocus event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onFocus(event) {
    this.setState({
      [event.target.className]: true,
      errors: {}
    });
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    const { errors, fullName, userName, phoneNumber, email, showLabelFullname,
      showLabelEmail, showLabelPhoneNumber, showLabelUsername } = this.state;
    return (<div id="email-details"
      className="col  s12 m6 l6 card-panel">
      <form onSubmit={this.onSubmit} className="login-form">
        <div className="row">
          <div className="input-field col s12 center">
            <h5 className="center"><b>Edit Your Profile</b></h5>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix" />
            <input className="showLabelFullname"
              onFocus={this.onFocus} onChange={this.onChange}
              name= "fullName" value={fullName}
              id="fullname" type="text"
              required="true"/>
            { showLabelFullname &&
            <label htmlFor="fullname"
              className="center-align">Full Name</label> }
          </div>
          {errors.fullName &&
          <div className="mes"><i>{errors.fullName}</i></div>}
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix" />
            <input className="showLabelUsername"
              onFocus={this.onFocus} onChange={this.onChange}
              name= "userName" value={userName}
              id="username" type="text" required="true" disabled/>
            {showLabelUsername &&
            <label htmlFor="username" className="center-align">Username</label>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-communication-phone prefix" />
            <input className="showLabelPhoneNumber"
              onFocus={this.onFocus} onChange={this.onChange}
              name= "phoneNumber" value={phoneNumber}
              id="phoneNumber" type="text"
              required="true"/>
            {showLabelPhoneNumber &&
            <label htmlFor="phoneNumber"
              className="center-align">Phone Number</label> }
          </div>
          {errors.phoneNumber &&
          <div className="mes"><i>{errors.phoneNumber}</i></div>}
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-communication-email prefix" />
            <input onFocus={this.onFocus} className="showLabelEmail"
              onChange={this.onChange}
              name= "email" value={email} id="email"
              type="email" required="true"/>
            {showLabelEmail &&
            <label htmlFor="email" className="center-align">Email</label>}
          </div>
          {errors.email &&
          <div className="mes"><i>{errors.email}</i></div>}
        </div>
        { this.state.displayButton && <div className="row">
          <a className="col s12">
            <button
              className="btn purple darken-1 waves-effect waves-light col s12">
                      Update Now
            </button></a>
        </div>}
        { !this.state.displayButton && <div className="row">
          <a className="col s12">
            <button
              className="btn red darken-1 waves-effect waves-light col s12">
                      CANCEL
            </button></a>
        </div>}
        <div className="col s12 resetUser">
          <p className="margin center medium-small sign-up">
            <a id="clickMe" onClick={this.onClick} href="#!">
              Change Password
            </a>
          </p>
        </div>
      </form>
    </div>);
  }
}
export default EditUser;
