import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePage from './components/home/HomePage.jsx';
import App from './components/App.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import requireAuth from './utils/requireAuth';
import requireAuthForHome from './utils/requireAuthForHomePage';
import ForgotPasswordPage from
  './components/forgetPassword/ForgetPasswordPage.jsx';
import SignupPage from './components/signup/SignupPage.jsx';
import NotFound from './components/notfound/NotFound.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthForHome(HomePage)} />
    <Route path="dashboard" component={requireAuth(Dashboard)}/>
    <Route path="forgotPassword"
      component={requireAuthForHome(ForgotPasswordPage)}/>
    <Route path="signup" component={requireAuthForHome(SignupPage)}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
