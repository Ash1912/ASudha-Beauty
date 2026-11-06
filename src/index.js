// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';

/**
 * ⚠️ IMPORTANT NOTE ON DOUBLE TRACKING:
 * You are initializing Google Analytics 4 directly here using 'react-ga4'.
 * 
 * Because you also added Google Tag Manager (GTM-PS2X7SM3) to your index.html:
 * 1. If you set up a GA4 Configuration tag inside GTM for 'G-QKYBG1SCDF', 
 *    you will track every visitor TWICE. 
 * 2. Choose one setup:
 *    - EITHER keep this ReactGA initialization (and only use GTM for Google Ads).
 *    - OR delete these two ReactGA lines entirely and manage ALL tracking via GTM.
 */
ReactGA.initialize('G-QKYBG1SCDF');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();