import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom'
import GlobalStyles from './styles/GlobalStyles';
import { Provider } from 'react-redux';
import store from './Store';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <GlobalStyles/>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);