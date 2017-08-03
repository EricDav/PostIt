import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePage from './components/homePage';
import App from './components/App';
import Dashboard from './components/dashboard/dashboard';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="dashboard" component={Dashboard}/>
    </Route>
);
