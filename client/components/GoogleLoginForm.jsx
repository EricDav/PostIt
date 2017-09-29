import React from 'react';

/** @class GoogleSignup
 * @classdesc component for signing up with google+
 */
class GoogleSignup extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.googleData.fullName,
      email: this.props.googleData.email,
      phoneNumber: '',
      userName: '',
      password: '',
      confirmPssword: '',
      errors: {},
      buttonText: 'Submit',
      status: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
     * @description - submit the state data
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      const error = {};
      error.confirmPassword = 'Password does not match';
      this.setState({ errors: error });
    } else {
      this.setState({
        status: true,
        buttonText: 'Loading...'
      });
      this.props.userSignupRequest(this.state).then(
        () => {
          Materialize.toast('Sign Up Successfully', 1000, 'purple',
            () => {
              window.location = 'dashboard';
            });
        },
        (data) => {
          this.setState({
            errors: data.response.data.error,
            status: false,
            buttonText: 'Submit'
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
    const { errors } = this.state;
    return (
      <center>
        <div className ="row">
          <div id="signup-page"
            className={`col m6 l6 offset-l3 offset-m3 s12 
            z-depth-4 card-panel reset`}>
            <form onSubmit={this.onSubmit} className="login-form">
              <div className="row">
                <div className="input-field col s12 center">
                  <h5 className="center">Kindly Complete Your Registration</h5>
                </div>
                { errors.message &&
            <div className="mes reduce"><i>
              <h6>{errors.message}</h6>
            </i>
            </div>}
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="mdi-social-person-outline prefix" />
                  <input id="phoneNumber" type="text" onChange={this.onChange}
                    value={this.state.phoneNumber} name="phoneNumber"
                    onBlur={this.onBlur} required="true"/>
                  <label htmlFor="phoneNumber"
                    className="center-align">Phone Number</label>
                </div>
                {errors.phoneNumber &&
              <div className="mes"><i>{errors.phoneNumber}</i></div>}
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="mdi-social-person-outline prefix" />
                  <input id="username" type="text" onChange={this.onChange}
                    value={this.state.userName} name="userName"
                    onBlur={this.onBlur} required="true"/>
                  <label htmlFor="username"
                    className="center-align">Username
                  </label>
                </div>
                {errors.userName &&
                <div className="mes"><i>{errors.userName}</i></div>}
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="mdi-action-lock-outline prefix" />
                  <input id="password" type="password" onChange={this.onChange}
                    value={this.state.password} name="password"
                    onBlur={this.onBlur} required="true"/>
                  <label htmlFor="password">Password</label>
                </div>
                {errors.password &&
              <div className="mes">{errors.password}</div>}
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="mdi-action-lock-outline prefix" />
                  <input id="password-again" type="password"
                    onChange={this.onChange}
                    value={this.state.confirmPassword} name="confirmPassword"
                    onBlur={this.onBlur} required="true"/>
                  <label htmlFor="password-again">Confirm Password</label>
                </div>
                {errors.confirmPassword &&
              <div className="mes"><i>{errors.confirmPassword}</i></div>}
              </div>
              <div className="row">
                <a className="col s12">
                  <button
                    className= {`btn purple darken-1 waves-effect
                    waves-light col s12`}
                    disabled={this.state.status}>
                    {this.state.buttonText}
                  </button></a>
              </div>
            </form>
          </div>
        </div>
      </center>
    );
  }
}

export default GoogleSignup;
