import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../Navbar';
import Details from './Details';
import Confirm from './Confirm';
import PropTypes from 'prop-types';
import { sendSecretCode, VerifyCodeAndUpdatePassword } from '../../actions/resetPassword';

const ForgetPassword = (props) => {
      return (
             <div className="body-container"   className="image">
              <NavBar/>
                <center>
                <div id="login-page" className="col s12 z-depth-4 card-panel reset">
                 {!props.willShow && <Details sendSecretCode={props.sendSecretCode}/>}
                 {props.willShow && <Confirm user={props.resetPasswordUser} verifyCodeAndUpdate={props.VerifyCodeAndUpdatePassword}/>}
              </div>
               </center>
               </div>
      )
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
