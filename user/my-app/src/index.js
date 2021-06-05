import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/fontawesome.css';
import '../src/assets/css/placeholder-loading.min.css'
import '../src/assets/css/animate.min.css';
import '../src/assets/css/style.css';
import LocalStorageHelper from "./LocalStorageHelper/LocalStorageHelper";
import axios from 'axios';

//bearer token save
axios.defaults.headers.common['Authorization'] = 'Bearer '+ LocalStorageHelper.getToken('token')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
