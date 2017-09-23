import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePage from './components/HomePage';
import App from './components/App';
import Dashboard from './components/dashboard/Dashboard';
import requireAuth from './utils/requireAuth';
import requireAuthForHome from './utils/requireAuthForHomePage';
import ForgotPassword from './components/forgetPassword/ForgetPassword';
import Feedback from './components/feedback/feedback';
import SignupPage from './components/SignupPage';
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
