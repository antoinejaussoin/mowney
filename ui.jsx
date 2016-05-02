/* eslint import/no-unresolved: 0 */
import 'babel-polyfill';
import Index from './app/index';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(<Index />, document.getElementById('content'));
