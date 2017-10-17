import React from 'react';

/** @class Details
 * @classdesc component to confirm secret code
 */
class VerificationForm extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      failure: false,
      buttonText: 'Submit',
      buttonStatus: false
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
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
     * @description - handles the onfocus event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onFocus() {
    this.setState({
      error: '',
      failure: false
    })
  }
  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick(event) {
    event.preventDefault();
    this.setState({
      buttonText: 'Loading ...',
      buttonStatus: true
    });
    this.props.sendSecretCode(this.state).then(
      () => {
        Materialize.toast('A code has been sent to your mail', 2500, 'green');
      },
      (data) => {
        console.log(data);
        this.setState({
          error: data.response.data.message,
          failure: true,
          buttonStatus: false,
          buttonText: 'Submit'
        });
      }
    );
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      <form id="login" className="login-form form">
        <div className="row">
          <div className="input-field col s12 center">
            <h5 className="center login-form-text">Reset Password</h5><br/>
            {this.state.failure &&
            <div className="mes"><b>
              <i>{this.state.error}</i></b></div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-communication-email prefix" />
            <input onFocus={this.onFocus} name="email" id="email" type="email"
              onChange={this.onChange} required="true"
              value={this.state.email}/>
            <label htmlFor="email"
              className="center-align">
              Enter the email you use for this account
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button onClick={this.onClick}
              className="btn purple darken-1 waves-effect waves-light col s12"
              disabled={this.state.buttonStatus}>
              {this.state.buttonText}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <p className="margin center medium-small sign-up"/>
          </div>
        </div>
      </form>
    );
  }
}


export default VerificationForm;
