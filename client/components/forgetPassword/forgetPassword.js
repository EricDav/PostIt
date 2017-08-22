import React from 'react';
import NavBar from '../NavBar';
import Details from './details';
import Confirm from './Confirm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendSecretCode, VerifyCodeAndUpdatePassword } from '../../actions/resetPassword';

class ForgetPassword extends React.Component {
  render() {
      return (
             <div className="body-container"   className="image">
                <NavBar/>
                <center>
                <div id="login-page" className="col s12 z-depth-4 card-panel reset">
                 {!this.props.willShow && <Details sendSecretCode={this.props.sendSecretCode}/>}
                 {this.props.willShow && <Confirm user={this.props.resetPasswordUser} verifyCodeAndUpdate={this.props.VerifyCodeAndUpdatePassword}/>}
              </div>
               </center>
               </div>
      )
  }
}

const ResetPasswordPropTypes = {
    sendSecretCode: PropTypes.func,
    VerifyCodeAndUpdatePassword:  PropTypes.func
 }
 function mapStateToProps(state) {
   return {
     willShow: state.willShow,
     user: state.resetPasswordUser
   }
 }

 PropTypes.checkPropTypes(ResetPasswordPropTypes, 'prop', 'ForgotPassword');

 export default connect(mapStateToProps, { sendSecretCode, VerifyCodeAndUpdatePassword })(ForgetPassword);
