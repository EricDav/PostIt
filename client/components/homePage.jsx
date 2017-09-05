import React from 'react';
import SignUp from './signup';
import Login from './logIn';
import NavBar from './navbar';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupActions';
import { userSigninRequest, setPage } from '../actions/userActions';
import PropTypes from 'prop-types';
import GoogleSignup from './googleLoginForm';

class HomePage extends React.Component {
    render() {
      const {userSignupRequest, userSigninRequest, setPage} = this.props;
        return (
       <div className="body-container"   className="image">
        <NavBar/>
       {this.props.showGoogleForm.showForm && <div className="row" >
          <div className="col s6 offset-s3 valign">
            <div className="row">
              <Login setPage={setPage} userSigninRequest={userSigninRequest} googleData={this.props.showGoogleForm}/>
            </div>
          </div>
        </div> }
         {!this.props.showGoogleForm.showForm && <GoogleSignup userSignupRequest={userSignupRequest} googleData={this.props.showGoogleForm}/> }
       </div> 
        ); 
    }
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
