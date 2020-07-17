import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Router from 'Core/Router';

// eslint-disable-next-line no-undef
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app-root'),
);
