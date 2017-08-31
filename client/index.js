import React from 'react';
import { render } from 'react-dom';
import HomePage from './components/homePage';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/userActions';
import Dashboard from './components/dashboard/dashboard';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUserGroups } from './actions/getGroupsAction';
import configureStore from './store/configureStore';
import { h } from './actions/getGroupsAction';
//import js from '../public/js/modal'

// import './assets/css/custom.scss';
// import '../node_modules/materialize-css/dist/js/materialize.min';
// import '../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../node_modules/material-icons/css/material-icons.css';
// import '../node_modules/sweetalert/dist/sweetalert.min';
// import '../node_modules/sweetalert/dist/sweetalert.css';

const store = configureStore();

 if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  //store.dispatch(setCurrentUserGroups())
}
render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app'));