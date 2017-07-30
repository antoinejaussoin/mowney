/* eslint import/no-unresolved:0 no-undef:0 */
/* eslint global-require:0 */
import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import 'react-toolbox/lib/commons.scss';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const rootElement = document.getElementById('content');

render(<AppContainer><App /></AppContainer>, rootElement);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;

    render(<AppContainer><NextApp /></AppContainer>, rootElement);
  });
}
