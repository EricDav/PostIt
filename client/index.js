import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Router, browserHistory } from 'react-router';

import { setCurrentUser } from './actions/userActions';
import setAuthorizationToken from './utils/setAuthorizationToken';
import routes from './routes';
import { setCurrentUserGroups } from './actions/getGroupsAction';
import configureStore from './store/configureStore';
//import js from '../public/js/modal'

//import './assets/css/custom.scss';
//import '../node_modules/materialize-css/dist/js/materialize.min';
//import '../node_modules/materialize-css/dist/css/materialize.min.css';
//import '../node_modules/material-icons/css/material-icons.css';
import '../node_modules/sweetalert/dist/sweetalert.min';
import '../node_modules/sweetalert/dist/sweetalert.css';

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