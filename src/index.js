import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './component/App';
import * as serviceWorker from './serviceWorker';
import { MapProvider } from "./component/hooks/mapProvider";

const app = (
    <MapProvider>
        <App/>
    </MapProvider>
);
ReactDOM.render(app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
