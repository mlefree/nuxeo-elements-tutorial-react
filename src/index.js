import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// define legacy router for elements using `nuxeo-router-behavior`
import {RoutingBehavior} from '@nuxeo/nuxeo-ui-elements/nuxeo-routing-behavior';
RoutingBehavior.__router = {
    browse() {
        return '#';
    },
};

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
