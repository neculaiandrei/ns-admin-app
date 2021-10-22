import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './main.scss';
import persons from './Data';

ReactDOM.render(
  <React.StrictMode>
    <App persons={persons}/>
  </React.StrictMode>,
  document.getElementById('root')
);