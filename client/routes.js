import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePage from './components/HomePage.jsx';
import App from './components/App.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import requireAuth from './utils/requireAuth';
import requireAuthForHome from './utils/requireAuthForHomePage';
import ForgotPassword from './components/forgetPassword/ForgetPassword.jsx';
import SignupPage from './components/SignupPage.jsx';
import NotFound from './components/NotFound.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthForHome(HomePage)} />
    <Route path="dashboard" component={requireAuth(Dashboard)}/>
    <Route path="forgotPassword"
      component={requireAuthForHome(ForgotPassword)}/>
    <Route path="signup" component={requireAuthForHome(SignupPage)}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
