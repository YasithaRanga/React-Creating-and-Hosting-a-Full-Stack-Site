import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyDxXGJ_igP-KznnejdCQhUCkjA185etSGk",
  authDomain: "react-full-stack-site-f1556.firebaseapp.com",
  projectId: "react-full-stack-site-f1556",
  storageBucket: "react-full-stack-site-f1556.appspot.com",
  messagingSenderId: "344236698439",
  appId: "1:344236698439:web:7f1da2d173aec5e3403a62"
};

const app = initializeApp(firebaseConfig);

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
