import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Promise from 'promise-polyfill';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import './Animation.css';

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
