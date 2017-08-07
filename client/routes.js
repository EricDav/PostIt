import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePage from './components/homePage';
import App from './components/App';
import Dashboard from './components/dashboard/dashboard';
import requireAuth from './utils/requireAuth';
import requireAuthForHome from './utils/requireAuthForHomePage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={requireAuthForHome(HomePage)} />
        <Route path="dashboard" component={requireAuth(Dashboard)}/>
    </Route>
);
