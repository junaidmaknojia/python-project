import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store'
import DevsProvider from './context/DevsProvider';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <DevsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DevsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
