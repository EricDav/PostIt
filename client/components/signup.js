import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        fullname: '',
        phoneNumber: '',
        email: '',
        password: '',
        Password: ''

      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      onSubmit(e) {
        console.log('yes');
        e.preventDefault();
        console.log(this.state);
      }
    render() {
        return (<div id="signup-page" className="col s12 z-depth-4 card-panel">
                <form  onSubmit={this.onSubmit} className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h4>Register</h4>
                      <p className="center">Join to our community now !</p>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="fullname" type="text" onChange={this.onChange} value={this.state.fullname} name="fullname" />
                      <label htmlFor="fullname" className="center-align">Full Name</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="username" type="text" onChange={this.onChange} value={this.state.username} name="username"/>
                      <label htmlFor="username" className="center-align">Username</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="fullname" type="text" onChange={this.onChange} value={this.state.phoneNumber} name="phoneNumber" />
                      <label htmlFor="phoneNumber" className="center-align">Phone Number</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-communication-email prefix" />
                      <input id="email" type="email" onChange={this.onChange} value={this.state.email} name="email" />
                      <label htmlFor="email" className="center-align">Email</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password" type="password" onChange={this.onChange} value={this.state.password} name="password" />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password-again" type="password" onChange={this.onChange} value={this.state.Password} name="Password" />
                      <label htmlFor="password-again">Confirm Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button className="input-field col s12">
                      <a  className="btn purple darken-1 waves-effect waves-light col s12">Register Now</a>
                    </button>
                  </div>
                </form>
              </div>);
    }
}

export default SignUp;