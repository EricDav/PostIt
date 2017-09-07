import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        fullname: '',
        phoneNumber: '',
        email: '',
        password: '',
        Password: '',
        errors: {},
        textContent: 'REGISTER NOW',
        status: false
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onBlur = this.onBlur.bind(this);
    }
    onChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      onBlur(event) {
        const name = event.target.name;
        const nameObject = {};
        const error = this.state.errors;
        nameObject[name] = this.state[name];
        if (name === "Password" && this.state[name] !== '') {
          if (this.state.password !== this.state[name]) {
            error[name] = 'Password does not match';
            this.setState({errors: error});
          }
        }
        else if (nameObject[name]) {
          this.props.userSignupRequest(nameObject).then(
           () => {},
          ( data ) => {
            error[name] = data.response.data.error[name]
            this.setState({errors: error});
          }
        );
        }
      }
      onSubmit(event) {
        this.setState({error: {}});
        event.preventDefault();
        if (this.state.password !== this.state.Password) {
           error[name] = 'Password does not match';
           this.setState({errors: error});
        } else {
           this.setState({
            textContent: 'Loading...',
            status: true
           });
           this.props.userSignupRequest(this.state).then(
           () => {
             Materialize.toast('Sign Up Successfully', 1000, 'purple');
                browserHistory.push('dashboard');
                window.location.reload();
                this.props.getGroupsRequest();
                this.props.getAllUsersRequest();
           },
          ( data ) => {

            this.setState({
              errors: data.response.data.error, 
              textContent: 'REGISTER NOW',
              status: false
            });
          }
        );
        }
      }
    render() {
      const { errors } = this.state;
        return (<div id="signup-page" className="col s6 z-depth-4 card-panel reset">
                <form  onSubmit={this.onSubmit} className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h4>Register</h4>
                      <p className="center">Join our community now!</p>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s6">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="fullname" type="text" onChange={ this.onChange } value={ this.state.fullname } name="fullname" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="fullname" className="center-align">Full Name</label>
                      {errors.fullname && <div className="mes reduce blue-text"><i>{errors.fullname}</i></div>}
                    </div>
                    <div className="input-field col s6">
                      <i className="mdi-social-person-outline prefix" />
                      <input id="username" type="text" onChange={this.onChange} value={this.state.username} name="username" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="username" className="center-align">Username</label>
                    </div>
                    {errors.username && <div className="mes blue-text"><i>{errors.username}</i></div>}
                  </div>
                  <div className="row margin">
                    <div className="input-field col s6">
                      <i className="mdi-communication-phone prefix" />
                      <input id="phoneNumber" type="text" onChange={this.onChange} value={this.state.phoneNumber} name="phoneNumber" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="phoneNumber" className="center-align">Phone Number</label>
                      {errors.phoneNumber && <div className="mes blue-text"><i>{errors.phoneNumber}</i></div>}
                    </div>
                    <div className="input-field col s6">
                      <i className="mdi-communication-email prefix" />
                      <input id="email" type="email" onChange={this.onChange} value={this.state.email} onBlur={this.onBlur} name="email"  required="true"/>
                      <label htmlFor="email" className="center-align">Email</label>
                    </div>
                     {errors.email && <div className="mes blue-text"><i>{errors.email}</i></div>}
                  </div>
                  
                  <div className="row margin">
                    <div className="input-field col s6">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password" type="password" onChange={this.onChange} value={this.state.password} name="password" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="password">Password</label>
                       {errors.password && <div className="mes blue-text"><i>{errors.password}</i></div>}
                    </div>
                    <div className="input-field col s6">
                      <i className="mdi-action-lock-outline prefix" />
                      <input id="password-again" type="password" onChange={this.onChange} value={this.state.Password} name="Password" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="password-again">Confirm Password</label>
                    </div>
                    <i>{errors.Password && <div className="mes blue-text">{errors.Password}</div>}</i>
                  </div>
                  <div className="row">
                    <a className="col s12">
                      <button disabled={this.state.status} className="btn purple darken-1 waves-effect waves-light col s12">
                      {this.state.textContent}
                    </button></a>
                  </div>
                </form>
         </div>);
    }
}

export default SignUp;