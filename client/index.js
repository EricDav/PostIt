import React from 'react';
import { render } from 'react-dom';
import HomePage from './components/homePage';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import Dashboard from './components/dashboard/dashboard';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
    )
);

// if (localStorage.jwtToken) {
//   setAuthorizationToken(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
// }
render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app'));