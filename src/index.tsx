// import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';
import './scss/global.scss';
import { BrowserRouter } from 'react-router';
import App from './App';

createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
