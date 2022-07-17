import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {State} from "./context/State";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <State>
    <App />
  </State>
);
