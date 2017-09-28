import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from '../Navbar.jsx';
import Details from './Details.jsx';
import Confirm from './Confirm.jsx';
import { sendSecretCode, VerifyCodeAndUpdatePassword,
  setResetPasswordPage } from
  '../../actions/UserAction';

const ForgetPassword = props =>
  (
  <div className="body-container image">
    <NavBar/>
    <div id="reset" className="row">
      <div id="login-page"
        className={`col l6 offset-l3 m6 offset-m3 s12 
        z-depth-4 card-panel`}>
        {!props.willShow && <Details sendSecretCode={props.sendSecretCode}/>}
        {props.willShow && <Confirm user={props.resetPasswordUser}
          verifyCodeAndUpdate={props.VerifyCodeAndUpdatePassword}
          setResetPasswordPage={props.setResetPasswordPage}/>}
      </div>
    </div>
  </div>
  );

const ResetPasswordPropTypes = {
  sendSecretCode: PropTypes.func,
  VerifyCodeAndUpdatePassword: PropTypes.func,
  setResetPasswordPage: PropTypes.func
};

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  return {
    willShow: state.willShow,
    user: state.resetPasswordUser
  };
}

PropTypes.checkPropTypes(ResetPasswordPropTypes, 'prop', 'ForgotPassword');

export default connect(mapStateToProps,
  { sendSecretCode, VerifyCodeAndUpdatePassword, setResetPasswordPage })(ForgetPassword);
