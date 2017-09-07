import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePage from './components/homePage';
import App from './components/app';
import Dashboard from './components/dashboard/dashboard';
import requireAuth from './utils/requireAuth';
import requireAuthForHome from './utils/requireAuthForHomePage';
import ForgotPassword from './components/forgetPassword/ForgetPassword';
import Feedback from './components/feedback/feedback';
import SignupPage from './components/signupPage';
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={requireAuthForHome(HomePage)} />
        <Route path="dashboard" component={requireAuth(Dashboard)}/>
        <Route path="forgotPassword" component={requireAuthForHome(ForgotPassword)}/>
        <Route path="feedback" component={Feedback}/>
        <Route path="signup" component={requireAuthForHome(SignupPage)}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
