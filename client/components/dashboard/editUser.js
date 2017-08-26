import React from 'react';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            showLabelFullname: false,
            showLabelEmail: false,
            showLabelPhoneNumber: false,
            fullname: this.props.user.fullname,
            username: this.props.user.username,
            email: this.props.user.email,
            phoneNumber: this.props.user.phoneNumber,
            displayButton: false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
        setTimeout(() => {
          const {username, fullname, email, phoneNumber} = this.state;
        console.log(username, fullname)
        if (this.state.user.fullname !== fullname || this.state.user.username !== this.state.username ||
        this.state.user.email !== email || this.state.user.phoneNumber !== phoneNumber) {
          this.setState({
            displayButton: true
          });
        } else {
          this.setState({
            displayButton: false
          });
        }
        }, 500)
      }
    onSubmit(event) {
       event.preventDefault();
        if (!this.state.displayButton) {
          this.props.showUpdateUserPage(false);
        } else {
          this.props.updateUserProfile(this.state).then(
        () => {
             Materialize.toast('Your prifile has been updated', 1500, 'purple');
             this.props.getUser();
             this.props.getGroupMessages(groupId.toString());
        },
          ( data ) => {
            this.setState({
            errors: data.response.data.error,
        });
      }
    )
    }
}
onClick(event) {
      this.props.showResetPassword(true);
  }
    onFocus(event) {
        this.setState({
            [event.target.className]: true,
            errors: {}
        });
    }
    render() {
        const { errors, fullname, username, phoneNumber, email, showLabelFullname,showLabelEmail, showLabelPhoneNumber, showLabelUsername } = this.state;
        return (<div id="email-details" className="col s12 m8 l8 card-panel my Message">
                <form onSubmit={this.onSubmit} className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h5 className="center"><b>Edit Your Profile</b></h5>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input className="showLabelFullname" onFocus={this.onFocus} onChange={this.onChange} name= "fullname" value={fullname} id="fullname" type="text" required="true"/>
                      { showLabelFullname && <label htmlFor="fullname" className="center-align">Full Name</label> }
                    </div>
                    {errors.fullname  && <div className="mes blue-text"><i>{errors.fullname}</i></div>}
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                    <input className="showLabelUsername" onFocus={this.onFocus} onChange={this.onChange}  name= "username" value={username} id="username" type="text" required="true" disabled/>
                    {showLabelUsername && <label htmlFor="username" className="center-align">Username</label>}
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-communication-phone prefix" />
                      <input className="showLabelPhoneNumber" onFocus={this.onFocus} onChange={this.onChange}  name= "phoneNumber" value={phoneNumber} id="phoneNumber" type="text"  required="true"/>
                      {showLabelPhoneNumber && <label htmlFor="phoneNumber" className="center-align">Phone Number</label> }
                    </div>
                    {errors.phoneNumber && <div className="mes blue-text"><i>{errors.phoneNumber}</i></div>}
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-communication-email prefix" />
                      <input onFocus={this.onFocus} className="showLabelEmail" onChange={this.onChange}  name= "email" value={email} id="email" type="email"   required="true"/>
                      {showLabelEmail && <label htmlFor="email" className="center-align">Email</label>}
                    </div>
                    {errors.email && <div className="mes blue-text"><i>{errors.email}</i></div>}
                  </div>
                  { this.state.displayButton && <div className="row">
                    <a className="col s12">
                      <button className="btn purple darken-1 waves-effect waves-light col s12">
                      Update Now
                    </button></a>
                  </div>}
                 { !this.state.displayButton && <div className="row">
                    <a className="col s12">
                      <button className="btn red darken-1 waves-effect waves-light col s12">
                      CANCEL
                    </button></a>
                  </div>}
                    <div className="col s12 resetUser">
                      <p className="margin center medium-small sign-up"><a onClick={this.onClick} href="#!">Reset Password</a></p>
                    </div>
                </form>
         </div>);
    }
}
export default EditUser;
