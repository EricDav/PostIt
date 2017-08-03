import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

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
        errors: {}

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
           this.props.userSignupRequest(this.state).then(
           () => {
            browserHistory.push('dashboard');
             this.props.setFlashMessage({
               type: 'success',
               text: 'You have signed up successfully. welcome'
             })
           },
          ( data ) => {
            this.setState({errors: data.response.data.error});
          }
        );
        }
      }
    render() {
      const { errors } = this.state;
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
                      <input id="fullname" type="text" onChange={ this.onChange } value={ this.state.fullname } name="fullname" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="fullname" className="center-align">Full Name</label>
                    </div>
                    {errors.fullname && <div className="mes blue-text">{errors.fullname}</div>}
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
                      <i className="mdi-social-person-outline prefix" />
                      <input id="phoneNumber" type="text" onChange={this.onChange} value={this.state.phoneNumber} name="phoneNumber" onBlur={this.onBlur} required="true"/>
                      <label htmlFor="phoneNumber" className="center-align">Phone Number</label>
                    </div>
                    {errors.phoneNumber && <div className="mes blue-text">{errors.phoneNumber}</div>}
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-communication-email prefix" />
                      <input id="email" type="email" onChange={this.onChange} value={this.state.email} onBlur={this.onBlur} name="email"  required="true"/>
                      <label htmlFor="email" className="center-align">Email</label>
                    </div>
                    {errors.email && <div className="mes blue-text">{errors.email}</div>}
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
                      Register Now
                    </button></a>
                  </div>
                </form>
         </div>);
    }
}

 SignUp.propTypes = {
   userSignupRequest: PropTypes.func.isRequired,
   setFlashMessage: PropTypes.func.isRequired
 }

export default SignUp;