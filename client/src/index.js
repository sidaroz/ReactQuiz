import React from 'react';
import Reducer from './Reducer'
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import './index.css';

const store = createStore(Reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>
  </React.StrictMode>
);



