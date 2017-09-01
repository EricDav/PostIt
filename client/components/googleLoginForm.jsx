import React from 'react';
import { browserHistory } from 'react-router';

class GoogleSignup extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        fullname: this.props.googleData.fullname,
        email: this.props.googleData.email,
        phoneNumber: '',
        username: '',
        password: '',
        Password: '',
        errors: {}
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    
      onChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      onSubmit(event) {
        this.setState({error: {}});
        event.preventDefault();
        if (this.state.password !== this.state.Password) {
           error[name] = 'Password does not match';
           this.setState({errors: error});
        } else {
           this.props.userSignupRequest(this.state).then(
           () => {
             Materialize.toast('Sign Up Successfully', 1000, 'purple',
            () => {
                browserHistory.push('dashboard');
                window.location.reload();
            });
           },
          ( data ) => {
            this.setState({errors: data.response.data.error});
          }
        );
        }
      }
    render() {
      const { errors } = this.state;
      return(
          <center>
          <div id="signup-page" className="col s12 z-depth-4 card-panel reset">
                <form  onSubmit={this.onSubmit} className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h5 className="center">Kindly Complete Your Registration</h5>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="phoneNumber" type="text" onChange={this.onChange} value={this.state.phoneNumber} name="phoneNumber" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="phoneNumber" className="center-align">Phone Number</label>
                    </div>
                    {errors.phoneNumber && <div className="mes blue-text">{errors.phoneNumber}</div>}
                  </div>
                 <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="username" type="text" onChange={this.onChange} value={this.state.username} name="username" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="username" className="center-align">Username</label>
                    </div>
                    {errors.username && <div className="mes blue-text">{errors.username}</div>}
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password" type="password" onChange={this.onChange} value={this.state.password} name="password" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="password">Password</label>
                    </div>
                    {errors.password && <div className="mes blue-text">{errors.password}</div>}
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password-again" type="password" onChange={this.onChange} value={this.state.Password} name="Password" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="password-again">Confirm Password</label>
                    </div>
                    {errors.Password && <div className="mes blue-text">{errors.Password}</div>}
                  </div>
                  <div className="row">
                    <a className="col s12">
                      <button className="btn purple darken-1 waves-effect waves-light col s12">
                        submit
                    </button></a>
                  </div>
                </form>
         </div>
         </center>
      )
    }
}

export default GoogleSignup;
