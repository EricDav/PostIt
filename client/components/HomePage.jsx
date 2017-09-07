import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignUp from './Signup';
import Login from './LogIn';
import NavBar from './Navbar';
import { userSignupRequest } from '../actions/signupActions';
import { userSigninRequest, setPage } from '../actions/userActions';
import GoogleSignup from './GoogleLoginForm';

const HomePage = (props) => {
      const {userSignupRequest, userSigninRequest, setPage} = props;
        return (
       <div className="body-container"   className="image">
        <NavBar/>
       {props.showGoogleForm.showForm && <div className="row" >
          <div className="col s6 offset-s3 valign">
            <div className="row">
              <Login setPage={setPage} userSigninRequest={userSigninRequest} googleData={props.showGoogleForm}/>
            </div>
          </div>
        </div> }
         {!props.showGoogleForm.showForm && <GoogleSignup userSignupRequest={userSignupRequest} googleData={props.showGoogleForm}/> }
       </div> 
        ); 
}

const HomePagePropTypes = {
   userSigninRequest: PropTypes.func,
   setPage: PropTypes.func,
 }

 function mapStateToProps(state) {
   return {
     showGoogleForm: state.showGoogleForm,
     currentPage: state.setCurrentPage
   };
 }

 PropTypes.checkPropTypes(HomePagePropTypes, 'prop', 'HomePage');

export default connect(mapStateToProps, {userSigninRequest, userSignupRequest, setPage})(HomePage);
