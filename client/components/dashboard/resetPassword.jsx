import React from 'react';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newPassword: '',
        oldPassword: '',
        confirmPassword: '',
        error: '',
        status: false
    }
    this.onChange =this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
     this.setState({
          [event.target.name]: event.target.value
    });
  }
  onSubmit(event) {
      event.preventDefault();
      if (this.state.newPassword !== this.state.confirmPassword) {
          this.setState({
              error: 'Password does not match'
          });
      } else {
          this.setState({
              status: true
          })
          this.props.resetPassword(this.state).then(
          () => {
             Materialize.toast('Your password has been reset', 1500, 'purple');

          },
          (data) => {
            this.setState({
                error: data.response.data.message,
                status: false
            });
          }
      )
      }
  }
  onClick(event) {
      this.props.showResetPassword(false);
  }
  render() {
        return (<div id="email-details" className="col s12 m8 l8 card-panel my Message">
                <form onSubmit={this.onSubmit} className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <p className="center"><h5><b>Reset Password</b></h5></p>
                       {this.state.error && <div className="errorMessage center">{this.state.error}</div>}
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                     <i className="mdi-action-lock-outline prefix" />
                      <input className="showLabelFullname" onChange={this.onChange} name= "oldPassword"  id="password" type="password" required="true"/>
                     <label htmlFor="fullname" className="center-align">Old Password</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                     <i className="mdi-action-lock-outline prefix" />
                    <input className="showLabelUsername" onChange={this.onChange}  name= "newPassword"  id="password" type="password" required="true"/>
                   <label htmlFor="username" className="center-align">New Password</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                     <i className="mdi-action-lock-outline prefix" />
                      <input className="showLabelPhoneNumber" onFocus={this.onFocus} onChange={this.onChange}  name= "confirmPassword" id="password-again" type="password"  required="true"/>
                    <label htmlFor="phoneNumber" className="center-align">Confirm New Passwprd</label>
                    </div>
                  </div>
                  <div className="row">
                    <a className="col s12">
                      <button className="btn purple darken-1 waves-effect waves-light col s12" disabled={this.state.status}>
                      Reset Password
                    </button></a>
                  </div>
                    <div className="col s12 resetUser">
                      <p className="margin center medium-small sign-up"><a onClick={this.onClick} href="#!">Edit Profile</a></p>
                    </div>
                </form>
         </div>);
    }
}

export default ResetPassword;