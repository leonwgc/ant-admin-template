import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { initWebVitals } from './utils/webVitals';
import './scss/index.scss';
import './scss/global.scss';

// 初始化 Web Vitals 性能监控
initWebVitals({
  displayOverlay: true, // 开发环境显示性能面板
});

createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
