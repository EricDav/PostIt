import React from 'react';
import { render } from 'react-dom';
import HomePage from './components/homePage';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
    )
);

render(
    <Provider store={store}>
    <HomePage />
    </Provider>,
    document.getElementById('app'));